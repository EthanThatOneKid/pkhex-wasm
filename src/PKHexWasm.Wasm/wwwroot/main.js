import { dotnet } from './_framework/dotnet.js'

const { getAssemblyExports, getConfig } = await dotnet.create();

const config = getConfig();
let api;
try {
    // The [JSExport] facade lives in namespace PKHexWasm.Wasm of the app assembly
    const exports = await getAssemblyExports(config.mainAssemblyName);
    api = exports.PKHexWasm.Wasm.PkHexExports;
} catch (err) {
    setStatus(`runtime failed to start: ${err.message ?? err}`, true);
    throw err;
}

const $ = (id) => document.getElementById(id);

function setStatus(text, isError = false) {
    const el = $('status');
    el.innerText = text;
    el.classList.toggle('error', isError);
}

let currentSave = null;
let currentGame = -1;

function applySave(save) {
    if (currentGame >= 0) api.Close(currentGame); // release the prior handle pair
    currentSave = save;
    currentGame = api.Load(save);
    $('save-size').innerText = save.length.toLocaleString();
    $('trainer').innerText = `${api.GameTrainerName(currentGame)} (${api.GameGeneration(currentGame)})`;
    const mons = api.GamePartyMonHandles(currentGame);
    if (mons.length > 0) {
        const mon = mons[0];
        $('species').innerText = `${api.MonSpecies(mon)}${api.MonSpecies(mon) === 25 ? ' (Pikachu)' : ''}`;
        $('level').innerText = api.MonLevel(mon);
        $('nickname').innerText = api.MonNickname(mon) || '—';
        $('mon-card').hidden = false;
    } else {
        $('mon-card').hidden = true;
    }
}

$('generate').addEventListener('click', () => {
    try {
        applySave(api.GenerateDemoSave('SPIKE'));
        setStatus('demo save generated and re-parsed through the binding');
    } catch (err) {
        setStatus(`generate failed: ${err.message ?? err}`, true);
    }
});

$('load-file').addEventListener('change', async (e) => {
    try {
        const file = e.target.files[0];
        if (!file) return;
        applySave(new Uint8Array(await file.arrayBuffer()));
        setStatus(`loaded "${file.name}"`);
    } catch (err) {
        setStatus(`load failed: ${err.message ?? err}`, true);
        e.target.value = '';
    }
});

$('export').addEventListener('click', () => {
    try {
        if (currentGame < 0) {
            setStatus('nothing to export yet', true);
            return;
        }
        // Export through the binding — fresh bytes reflecting all edits
        const exported = api.SaveBytes(currentGame);
        const blob = new Blob([exported], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.sav';
        a.click();
        URL.revokeObjectURL(url);
        setStatus(`exported ${exported.length.toLocaleString()} bytes`);
    } catch (err) {
        setStatus(`export failed: ${err.message ?? err}`, true);
    }
});

$('api-version').innerText = api.GetApiVersion();
setStatus('runtime ready — generate a demo save or load a .sav file');
