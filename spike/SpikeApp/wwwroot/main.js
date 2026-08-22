import { dotnet } from './_framework/dotnet.js'

const { getAssemblyExports, getConfig } = await dotnet.create();

const config = getConfig();
let api;
try {
    api = (await getAssemblyExports(config.mainAssemblyName)).SpikeApi;
} catch (err) {
    setStatus(`runtime failed to start: ${err.message ?? err}`, true);
    throw err;
}

const $ = (id) => document.getElementById(id);

let currentSave = null;

function setStatus(text, isError = false) {
    const el = $('status');
    el.innerText = text;
    el.classList.toggle('error', isError);
}

function renderMon(json) {
    const mon = JSON.parse(json);
    $('species').innerText = `${mon.species}${mon.species === 25 ? ' (Pikachu)' : mon.species === 0 ? ' (empty slot)' : ''}`;
    $('level').innerText = mon.level;
    $('nickname').innerText = mon.nickname || '—';
    $('mon-card').hidden = false;
}

function applySave(save) {
    const json = api.DescribeFirstPokemon(save);
    currentSave = save;
    $('save-size').innerText = save.length.toLocaleString();
    renderMon(json);
}

function handleError(context, err) {
    console.error(err);
    setStatus(`${context}: ${err.message ?? err}`, true);
}

$('generate').addEventListener('click', () => {
    try {
        applySave(api.GenerateDemoSave());
        setStatus('demo save generated and re-parsed through the binding');
    } catch (err) {
        handleError('generate failed', err);
    }
});

$('load-file').addEventListener('change', async (e) => {
    try {
        const file = e.target.files[0];
        if (!file) return;
        applySave(new Uint8Array(await file.arrayBuffer()));
        setStatus(`loaded "${file.name}" (${file.size.toLocaleString()} bytes)`);
    } catch (err) {
        handleError('load failed', err);
        e.target.value = '';
    }
});

$('rename').addEventListener('click', () => {
    try {
        if (!currentSave) {
            setStatus('generate or load a save first', true);
            return;
        }
        const name = $('new-nickname').value.trim();
        if (!name) {
            setStatus('enter a nickname first', true);
            return;
        }
        applySave(api.RenameFirstPokemon(currentSave, name));
        $('new-nickname').value = '';
        setStatus('nickname written; bytes re-exported and re-parsed');
    } catch (err) {
        handleError('rename failed', err);
    }
});

$('export').addEventListener('click', () => {
    try {
        if (!currentSave) {
            setStatus('nothing to export yet', true);
            return;
        }
        const blob = new Blob([currentSave], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'spike-export.sav';
        a.click();
        URL.revokeObjectURL(url);
        setStatus(`exported ${currentSave.length.toLocaleString()} bytes`);
    } catch (err) {
        handleError('export failed', err);
    }
});

$('api-version').innerText = api.GetApiVersion();
setStatus('runtime ready — generate a demo save or load a Gen 1 .sav file');
