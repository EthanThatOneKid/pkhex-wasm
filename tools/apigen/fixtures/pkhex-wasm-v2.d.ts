/// < GENERATED FILE — do not edit by hand.
/// Source: runtime-meta-v2.json @ sourceCommit 10016c6fe5b732a113c3ca732116ea8976dc1f2c (schema v2).
/// Covers 113 classes / 6805 members / 35 enums.
/// Regenerate via `deno task gen`; drift gate fails when this file lags.

/** Raw C# enum `PKHeX.Core.EntityContext`. */
export type EntityContext = "None" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen8" | "Gen9" | "SplitInvalid" | "Gen7b" | "Gen8a" | "Gen8b" | "Gen9a" | "MaxInvalid";

/** Raw C# enum `PKHeX.Core.TrainerIDFormat`. */
export type TrainerIDFormat = "None" | "SixteenBitSingle" | "SixteenBit" | "SixDigit";

/** Raw C# enum `PKHeX.Core.Nature`. */
export type Nature = "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random";

/** Raw C# enum `PKHeX.Core.GameVersion`. */
export type GameVersion = "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";

/** Raw C# enum `PKHeX.Core.StringConverterOption`. */
export type StringConverterOption = "None" | "ClearZero" | "Clear50" | "Clear7F" | "ClearFF" | "ClearZeroSafeTerminate";

/** Raw C# enum `PKHeX.Core.Shiny`. */
export type Shiny = "Random" | "Never" | "Always" | "AlwaysStar" | "AlwaysSquare" | "FixedValue";

/** Raw C# enum `PKHeX.Core.GroundTileType`. */
export type GroundTileType = "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt";

/** Raw C# enum `PKHeX.Core.GCRegion`. */
export type GCRegion = "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";

/** Raw C# enum `PKHeX.Core.MarkingColor`. */
export type MarkingColor = "None" | "Blue" | "Pink";

/** Raw C# enum `PKHeX.Core.HomeGameDataFormat`. */
export type HomeGameDataFormat = "None" | "PB7" | "PK8" | "PA8" | "PB8" | "PK9" | "PC9" | "PA9";

/** Raw C# enum `PKHeX.Core.ResortEventState`. */
export type ResortEventState = "NONE" | "SEIKAKU" | "CARE" | "LIKE_RESORT" | "LIKE_BATTLE" | "LIKE_ADV" | "GOOD_FRIEND" | "GIM" | "HOTSPA" | "WILD" | "WILD_LOVE" | "WILD_LIVE" | "POKEMAME_GET1" | "POKEMAME_GET2" | "POKEMAME_GET3" | "KINOMI_HELP" | "PLAY_STATE" | "HOTSPA_STATE" | "HOTSPA_DIZZY" | "HOTSPA_EGG_HATCHING" | "MAX";

/** Raw C# enum `PKHeX.Core.MoveType`. */
export type MoveType = "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy";

/** Raw C# enum `PKHeX.Core.RanchOwnershipType`. */
export type RanchOwnershipType = "None" | "Trainer" | "Hayley" | "Hayley_Traded";

/** Raw C# enum `PKHeX.Core.RanchOwnershipStatus`. */
export type RanchOwnershipStatus = "None" | "Traded";

/** Raw C# enum `PKHeX.Core.InventoryType`. */
export type InventoryType = "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones";

/** Raw C# enum `PKHeX.Core.BinaryExportSetting`. */
export type BinaryExportSetting = "None" | "ExcludeFooter" | "ExcludeHeader" | "ExcludeFinalize";

/** Raw C# enum `PKHeX.Core.EntityImportOption`. */
export type EntityImportOption = "UseDefault" | "Enable" | "Disable";

/** Raw C# enum `PKHeX.Core.StorageSlotSource`. */
export type StorageSlotSource = "None" | "Party" | "Party1" | "Party2" | "Party3" | "Party4" | "Party5" | "Party6" | "BattleTeam" | "BattleTeam1" | "BattleTeam2" | "BattleTeam3" | "BattleTeam4" | "BattleTeam5" | "BattleTeam6" | "Starter" | "Locked";

/** Raw C# enum `PKHeX.Core.Stadium2TeamType`. */
export type Stadium2TeamType = "Anything_Goes" | "Little_Cup" | "Poke_Cup" | "Prime_Cup" | "GymLeader_Castle" | "Vs_Rival";

/** Raw C# enum `PKHeX.Core.GBMobileCableColor`. */
export type GBMobileCableColor = "None" | "Blue" | "Yellow" | "Green" | "Red" | "Purple" | "Black" | "Pink" | "Gray" | "Debug" | "Disabled";

/** Raw C# enum `PKHeX.Core.GCVersion`. */
export type GCVersion = "None" | "FR" | "LG" | "S" | "R" | "E" | "CXD";

/** Raw C# enum `PKHeX.Core.LanguageGC`. */
export type LanguageGC = "Hacked" | "Japanese" | "English" | "German" | "French" | "Italian" | "Spanish" | "UNUSED_6";

/** Raw C# enum `PKHeX.Core.BattleFrontierFacility4`. */
export type BattleFrontierFacility4 = "Tower" | "Factory" | "Hall" | "Castle" | "Arcade";

/** Raw C# enum `PKHeX.Core.Seal4`. */
export type Seal4 = "HeartA" | "HeartB" | "HeartC" | "HeartD" | "HeartE" | "HeartF" | "StarA" | "StarB" | "StarC" | "StarD" | "StarE" | "StarF" | "LineA" | "LineB" | "LineC" | "LineD" | "SmokeA" | "SmokeB" | "SmokeC" | "SmokeD" | "ElectricA" | "ElectricB" | "ElectricC" | "ElectricD" | "FoamyA" | "FoamyB" | "FoamyC" | "FoamyD" | "FireA" | "FireB" | "FireC" | "FireD" | "PartyA" | "PartyB" | "PartyC" | "PartyD" | "FloraA" | "FloraB" | "FloraC" | "FloraD" | "FloraE" | "FloraF" | "SongA" | "SongB" | "SongC" | "SongD" | "SongE" | "SongF" | "SongG" | "LetterA" | "LetterB" | "LetterC" | "LetterD" | "LetterE" | "LetterF" | "LetterG" | "LetterH" | "LetterI" | "LetterJ" | "LetterK" | "LetterL" | "LetterM" | "LetterN" | "LetterO" | "LetterP" | "LetterQ" | "LetterR" | "LetterS" | "LetterT" | "LetterU" | "LetterV" | "LetterW" | "LetterX" | "LetterY" | "LetterZ" | "Shock" | "Mystery" | "Liquid" | "MAXLEGAL" | "Burst" | "Twinkle" | "MAX";

/** Raw C# enum `PKHeX.Core.Accessory4`. */
export type Accessory4 = "WhiteFluff" | "YellowFluff" | "PinkFluff" | "BrownFluff" | "BlackFluff" | "OrangeFluff" | "RoundPebble" | "GlitterBoulder" | "SnaggyPebble" | "JaggedBoulder" | "BlackPebble" | "MiniPebble" | "PinkScale" | "BlueScale" | "GreenScale" | "PurpleScale" | "BigScale" | "NarrowScale" | "BlueFeather" | "RedFeather" | "YellowFeather" | "WhiteFeather" | "BlackMoustache" | "WhiteMoustache" | "BlackBeard" | "WhiteBeard" | "SmallLeaf" | "BigLeaf" | "NarrowLeaf" | "ShedClaw" | "ShedHorn" | "ThinMushroom" | "ThickMushroom" | "Stump" | "PrettyDewdrop" | "SnowCrystal" | "Sparks" | "ShimmeringFire" | "MysticFire" | "Determination" | "PeculiarSpoon" | "PuffySmoke" | "PoisonExtract" | "WealthyCoin" | "EerieThing" | "Spring" | "Seashell" | "HummingNote" | "ShinyPowder" | "GlitterPowder" | "RedFlower" | "PinkFlower" | "WhiteFlower" | "BlueFlower" | "OrangeFlower" | "YellowFlower" | "GooglySpecs" | "BlackSpecs" | "GorgeousSpecs" | "SweetCandy" | "Confetti" | "ColoredParasol" | "OldUmbrella" | "Spotlight" | "Cape" | "StandingMike" | "Surfboard" | "Carpet" | "RetroPipe" | "FluffyBed" | "MirrorBall" | "PhotoBoard" | "PinkBarrette" | "RedBarrette" | "BlueBarrette" | "YellowBarrette" | "GreenBarrette" | "PinkBalloon" | "RedBalloons" | "BlueBalloons" | "YellowBalloon" | "GreenBalloons" | "LaceHeadress" | "TopHat" | "SilkVeil" | "HeroicHeadband" | "ProfessorHat" | "FlowerStage" | "GoldPedestal" | "GlassStage" | "AwardPodium" | "CubeStage" | "TURTWIGMask" | "CHIMCHARMask" | "PIPLUPMask" | "BigTree" | "Flag" | "Crown" | "Tiara" | "Comet";

/** Raw C# enum `PKHeX.Core.Backdrop4`. */
export type Backdrop4 = "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset";

/** Raw C# enum `PKHeX.Core.LanguageBR`. */
export type LanguageBR = "JapaneseOrEnglish" | "German" | "Spanish" | "French" | "Italian";

/** Raw C# enum `PKHeX.Core.MapUnlockState4`. */
export type MapUnlockState4 = "Johto" | "JohtoPlus" | "JohtoKanto" | "Invalid";

/** Raw C# enum `PKHeX.Core.PokegearNumber`. */
export type PokegearNumber = "None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest";

/** Raw C# enum `PKHeX.Core.Wallpaper4Pt`. */
export type Wallpaper4Pt = "Forest" | "City" | "Desert" | "Savanna" | "Crag" | "Volcano" | "Snow" | "Cave" | "Beach" | "Seafloor" | "River" | "Sky" | "Checks" | "PokeCenter" | "Machine" | "Simple" | "Distortion" | "Contest" | "Nostalgic" | "Croagunk" | "trio" | "PikaPika" | "Legend" | "Team_Galactic";

/** Raw C# enum `PKHeX.Core.ToughWord4`. */
export type ToughWord4 = "EarthTones" | "Implant" | "GoldenRatio" | "Omnibus" | "Starboard" | "MoneyRate" | "Resolution" | "Cadenza" | "Education" | "Cubism" | "CrossStitch" | "Artery" | "BoneDensity" | "Gommage" | "Streaming" | "Conductivity" | "Copyright" | "TwoStep" | "Contour" | "Neutrino" | "Howling" | "Spreadsheet" | "GMT" | "Irritability" | "Fractals" | "Flambe" | "StockPrices" | "PHBalance" | "Vector" | "Polyphenol" | "Ubiquitous" | "REMSleep";

/** Raw C# enum `PKHeX.Core.VillaFurniture4`. */
export type VillaFurniture4 = "BigSofa" | "SmallSofa" | "Bed" | "NightTable" | "TV" | "AudioSystem" | "Bookshelf" | "Rack" | "Houseplant" | "PCDesk" | "MusicBox" | "PokemonBust1" | "PokemonBust2" | "Piano" | "GuestSet" | "WallClock" | "Masterpiece" | "TeaSet" | "Chandelier";

/** Raw C# enum `PKHeX.Core.PoketchColor`. */
export type PoketchColor = "Green" | "Yellow" | "Orange" | "Red" | "Purple" | "Blue" | "Turquoise" | "White";

/** Raw C# enum `PKHeX.Core.PoketchApp`. */
export type PoketchApp = "Digital_Watch" | "Calculator" | "Memo_Pad" | "Pedometer" | "Party" | "Friendship_Checker" | "Dowsing_Machine" | "Berry_Searcher" | "Daycare" | "History" | "Counter" | "Analog_Watch" | "Marking_Map" | "Link_Searcher" | "Coin_Toss" | "Move_Tester" | "Calendar" | "Dot_Artist" | "Roulette" | "Trainer_Counter" | "Kitchen_Timer" | "Color_Changer" | "Matchup_Checker" | "Stopwatch" | "Alarm_Clock";

/** Raw C# enum `PKHeX.Core.ThrowStyle9`. */
export type ThrowStyle9 = "OriginalStyle" | "LeftHandedStyle" | "ElegantStyle" | "ReverentStyle" | "NinjaStyle" | "DaintyStyle" | "TwirlingStyle" | "SmugStyle" | "GalarianStarStyle";

/**
 * Projected from `PKHeX.Core.BK4` (Gen4).
 * Kind: class.
 */
export interface BK4 extends PKM {
convertTopk4(): PK4;
readonly isDecryptedStateBox: boolean;
setIsDecryptedStateBox(value: boolean): void;
readonly isDecryptedStateParty: boolean;
setIsDecryptedStateParty(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.Bank3`.
 * Kind: class.
 */
export interface Bank3 extends SaveFile {
getBoxName(box: number): string;
}

/**
 * Projected from `PKHeX.Core.Bank4`.
 * Kind: class.
 */
export interface Bank4 extends SaveFile {
getBoxName(box: number): string;
}

/**
 * Projected from `PKHeX.Core.Bank7`.
 * Kind: class.
 */
export interface Bank7 extends SaveFile {
getBoxIndex(box: number): number;
getBoxName(box: number): string;
getBoxNameOffset(box: number): number;
getGroupName(group: number): string;
readonly uid: bigint;
}

export declare namespace Bank7 {
function getBank7(data: Uint8Array): Bank7;
}

/**
 * Projected from `PKHeX.Core.BulkStorage`.
 * Kind: abstract.
 */
export interface BulkStorage extends SaveFile {
readonly isBigEndian: boolean;
}

/**
 * Projected from `PKHeX.Core.CK3` (Gen3).
 * Kind: class.
 */
export interface CK3 extends PKM {
convertTopk3(): PK3;
readonly currentRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setCurrentRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly expShadow: number;
setExpShadow(value: number): void;
forceCorrectFatefulState(japanese: boolean, value: boolean): void;
isFatefulValid(japanese: boolean): boolean;
readonly isShadow: boolean;
readonly nicknameDisplay: string;
setNicknameDisplay(value: string): void;
readonly nicknameDisplayTrash: Uint8Array;
readonly originalRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setOriginalRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly partySlot: number;
setPartySlot(value: number): void;
readonly purification: number;
setPurification(value: number): void;
resetNicknameDisplay(): void;
readonly shadowid: number;
setShadowid(value: number): void;
}

export declare namespace CK3 {
const purified: number;
function setPurified(value: number): void;
}

/**
 * Projected from `PKHeX.Core.EmptyPlayerBag`.
 * Kind: class.
 */
export interface EmptyPlayerBag extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.FakeSaveFile`.
 * Kind: class.
 */
export interface FakeSaveFile extends SaveFile {
}

export declare namespace FakeSaveFile {
/** Represents the default instance of the  class. */
const default_: FakeSaveFile;
function setDefault_(value: FakeSaveFile): void;
}

/**
 * Projected from `PKHeX.Core.G3PKM`.
 * Kind: abstract.
 */
export interface G3PKM extends PKM {
readonly abilityBit: boolean;
setAbilityBit(value: boolean): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
getMarking(index: number): boolean;
readonly markingCircle: boolean;
setMarkingCircle(value: boolean): void;
readonly markingCount: number;
readonly markingHeart: boolean;
setMarkingHeart(value: boolean): void;
readonly markingSquare: boolean;
setMarkingSquare(value: boolean): void;
readonly markingTriangle: boolean;
setMarkingTriangle(value: boolean): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountg3Beauty: number;
setRibbonCountg3Beauty(value: number): void;
readonly ribbonCountg3Cool: number;
setRibbonCountg3Cool(value: number): void;
readonly ribbonCountg3Cute: number;
setRibbonCountg3Cute(value: number): void;
readonly ribbonCountg3Smart: number;
setRibbonCountg3Smart(value: number): void;
readonly ribbonCountg3Tough: number;
setRibbonCountg3Tough(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonVictory: boolean;
setRibbonVictory(value: boolean): void;
readonly ribbonWinning: boolean;
setRibbonWinning(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
setMarking(index: number, value: boolean): void;
readonly speciesInternal: number;
setSpeciesInternal(value: number): void;
readonly unused1: boolean;
setUnused1(value: boolean): void;
readonly unused2: boolean;
setUnused2(value: boolean): void;
readonly unused3: boolean;
setUnused3(value: boolean): void;
readonly unused4: boolean;
setUnused4(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.G4PKM`.
 * Kind: abstract.
 */
export interface G4PKM extends PKM {
readonly balldpPt: number;
setBalldpPt(value: number): void;
readonly ballhgss: number;
setBallhgss(value: number): void;
belongsTo(tr: ITrainerInfo): boolean;
readonly checksum: number;
setChecksum(value: number): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
readonly eggLocationdp: number;
setEggLocationdp(value: number): void;
readonly eggLocationExtended: number;
setEggLocationExtended(value: number): void;
getMarking(index: number): boolean;
readonly groundTile: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt";
setGroundTile(value: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt"): void;
readonly iv32: number;
setIv32(value: number): void;
readonly markingCircle: boolean;
setMarkingCircle(value: boolean): void;
readonly markingCount: number;
readonly markingDiamond: boolean;
setMarkingDiamond(value: boolean): void;
readonly markingHeart: boolean;
setMarkingHeart(value: boolean): void;
readonly markingSquare: boolean;
setMarkingSquare(value: boolean): void;
readonly markingStar: boolean;
setMarkingStar(value: boolean): void;
readonly markingTriangle: boolean;
setMarkingTriangle(value: boolean): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly metLocationdp: number;
setMetLocationdp(value: number): void;
readonly metLocationExtended: number;
setMetLocationExtended(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly possiblyPalParkdp: boolean;
readonly possiblyPalParkhgss: boolean;
readonly possiblyPalParkPt: boolean;
readonly rib34: boolean;
setRib34(value: boolean): void;
readonly rib35: boolean;
setRib35(value: boolean): void;
readonly rib36: boolean;
setRib36(value: boolean): void;
readonly rib37: boolean;
setRib37(value: boolean): void;
readonly riba4: boolean;
setRiba4(value: boolean): void;
readonly riba5: boolean;
setRiba5(value: boolean): void;
readonly riba6: boolean;
setRiba6(value: boolean): void;
readonly riba7: boolean;
setRiba7(value: boolean): void;
readonly ribb0: boolean;
setRibb0(value: boolean): void;
readonly ribb1: boolean;
setRibb1(value: boolean): void;
readonly ribb2: boolean;
setRibb2(value: boolean): void;
readonly ribb3: boolean;
setRibb3(value: boolean): void;
readonly ribb4: boolean;
setRibb4(value: boolean): void;
readonly ribb5: boolean;
setRibb5(value: boolean): void;
readonly ribb6: boolean;
setRibb6(value: boolean): void;
readonly ribb7: boolean;
setRibb7(value: boolean): void;
readonly ribbonAbility: boolean;
setRibbonAbility(value: boolean): void;
readonly ribbonAbilityDouble: boolean;
setRibbonAbilityDouble(value: boolean): void;
readonly ribbonAbilityGreat: boolean;
setRibbonAbilityGreat(value: boolean): void;
readonly ribbonAbilityMulti: boolean;
setRibbonAbilityMulti(value: boolean): void;
readonly ribbonAbilityPair: boolean;
setRibbonAbilityPair(value: boolean): void;
readonly ribbonAbilityWorld: boolean;
setRibbonAbilityWorld(value: boolean): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbong3Beauty: boolean;
setRibbong3Beauty(value: boolean): void;
readonly ribbong3BeautyHyper: boolean;
setRibbong3BeautyHyper(value: boolean): void;
readonly ribbong3BeautyMaster: boolean;
setRibbong3BeautyMaster(value: boolean): void;
readonly ribbong3BeautySuper: boolean;
setRibbong3BeautySuper(value: boolean): void;
readonly ribbong3Cool: boolean;
setRibbong3Cool(value: boolean): void;
readonly ribbong3CoolHyper: boolean;
setRibbong3CoolHyper(value: boolean): void;
readonly ribbong3CoolMaster: boolean;
setRibbong3CoolMaster(value: boolean): void;
readonly ribbong3CoolSuper: boolean;
setRibbong3CoolSuper(value: boolean): void;
readonly ribbong3Cute: boolean;
setRibbong3Cute(value: boolean): void;
readonly ribbong3CuteHyper: boolean;
setRibbong3CuteHyper(value: boolean): void;
readonly ribbong3CuteMaster: boolean;
setRibbong3CuteMaster(value: boolean): void;
readonly ribbong3CuteSuper: boolean;
setRibbong3CuteSuper(value: boolean): void;
readonly ribbong3Smart: boolean;
setRibbong3Smart(value: boolean): void;
readonly ribbong3SmartHyper: boolean;
setRibbong3SmartHyper(value: boolean): void;
readonly ribbong3SmartMaster: boolean;
setRibbong3SmartMaster(value: boolean): void;
readonly ribbong3SmartSuper: boolean;
setRibbong3SmartSuper(value: boolean): void;
readonly ribbong3Tough: boolean;
setRibbong3Tough(value: boolean): void;
readonly ribbong3ToughHyper: boolean;
setRibbong3ToughHyper(value: boolean): void;
readonly ribbong3ToughMaster: boolean;
setRibbong3ToughMaster(value: boolean): void;
readonly ribbong3ToughSuper: boolean;
setRibbong3ToughSuper(value: boolean): void;
readonly ribbong4Beauty: boolean;
setRibbong4Beauty(value: boolean): void;
readonly ribbong4BeautyGreat: boolean;
setRibbong4BeautyGreat(value: boolean): void;
readonly ribbong4BeautyMaster: boolean;
setRibbong4BeautyMaster(value: boolean): void;
readonly ribbong4BeautyUltra: boolean;
setRibbong4BeautyUltra(value: boolean): void;
readonly ribbong4Cool: boolean;
setRibbong4Cool(value: boolean): void;
readonly ribbong4CoolGreat: boolean;
setRibbong4CoolGreat(value: boolean): void;
readonly ribbong4CoolMaster: boolean;
setRibbong4CoolMaster(value: boolean): void;
readonly ribbong4CoolUltra: boolean;
setRibbong4CoolUltra(value: boolean): void;
readonly ribbong4Cute: boolean;
setRibbong4Cute(value: boolean): void;
readonly ribbong4CuteGreat: boolean;
setRibbong4CuteGreat(value: boolean): void;
readonly ribbong4CuteMaster: boolean;
setRibbong4CuteMaster(value: boolean): void;
readonly ribbong4CuteUltra: boolean;
setRibbong4CuteUltra(value: boolean): void;
readonly ribbong4Smart: boolean;
setRibbong4Smart(value: boolean): void;
readonly ribbong4SmartGreat: boolean;
setRibbong4SmartGreat(value: boolean): void;
readonly ribbong4SmartMaster: boolean;
setRibbong4SmartMaster(value: boolean): void;
readonly ribbong4SmartUltra: boolean;
setRibbong4SmartUltra(value: boolean): void;
readonly ribbong4Tough: boolean;
setRibbong4Tough(value: boolean): void;
readonly ribbong4ToughGreat: boolean;
setRibbong4ToughGreat(value: boolean): void;
readonly ribbong4ToughMaster: boolean;
setRibbong4ToughMaster(value: boolean): void;
readonly ribbong4ToughUltra: boolean;
setRibbong4ToughUltra(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonVictory: boolean;
setRibbonVictory(value: boolean): void;
readonly ribbonWinning: boolean;
setRibbonWinning(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
setMarking(index: number, value: boolean): void;
readonly shinyLeaf: number;
setShinyLeaf(value: number): void;
updateHandler(tr: ITrainerInfo): void;
readonly walkingMood: number;
setWalkingMood(value: number): void;
}

/**
 * Projected from `PKHeX.Core.G6PKM`.
 * Kind: abstract.
 */
export interface G6PKM extends PKM {
belongsTo(tr: ITrainerInfo): boolean;
readonly checksum: number;
setChecksum(value: number): void;
fixRelearn(): void;
readonly iv32: number;
setIv32(value: number): void;
readonly oppositeFriendship: number;
setOppositeFriendship(value: number): void;
readonly sanity: number;
setSanity(value: number): void;
updateHandler(tr: ITrainerInfo): void;
}

/**
 * Projected from `PKHeX.Core.G8PKM`.
 * Kind: abstract.
 */
export interface G8PKM extends PKM {
readonly affixedRibbon: number;
setAffixedRibbon(value: number): void;
readonly battleVersion: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setBattleVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
readonly canGigantamax: boolean;
setCanGigantamax(value: boolean): void;
readonly checksum: number;
setChecksum(value: number): void;
clearMoveRecordFlags(): void;
clearPokeJobFlags(): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
readonly dynamaxLevel: number;
setDynamaxLevel(value: number): void;
readonly enjoyment: number;
setEnjoyment(value: number): void;
fixRelearn(): void;
readonly flag2: boolean;
setFlag2(value: boolean): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly fullness: number;
setFullness(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
getMoveRecordFlag(index: number): boolean;
getMoveRecordFlagAny(): boolean;
getPokeJobFlag(index: number): boolean;
getPokeJobFlagAny(): boolean;
getRibbon(index: number): boolean;
getRibbonByte(index: number): number;
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerid: number;
setHandlingTrainerid(value: number): void;
readonly handlingTrainerLanguage: number;
setHandlingTrainerLanguage(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly hasMarkEncounter8: boolean;
readonly hasMarkEncounter9: boolean;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly iv32: number;
setIv32(value: number): void;
readonly isFavorite: boolean;
setIsFavorite(value: boolean): void;
readonly markCount: number;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly palma: number;
setPalma(value: number): void;
readonly permit: IPermitRecord;
readonly pokeJob: Uint8Array;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib457: boolean;
setRib457(value: boolean): void;
readonly rib460: boolean;
setRib460(value: boolean): void;
readonly rib461: boolean;
setRib461(value: boolean): void;
readonly rib462: boolean;
setRib462(value: boolean): void;
readonly rib463: boolean;
setRib463(value: boolean): void;
readonly rib464: boolean;
setRib464(value: boolean): void;
readonly rib465: boolean;
setRib465(value: boolean): void;
readonly rib466: boolean;
setRib466(value: boolean): void;
readonly rib467: boolean;
setRib467(value: boolean): void;
readonly rib470: boolean;
setRib470(value: boolean): void;
readonly rib471: boolean;
setRib471(value: boolean): void;
readonly rib472: boolean;
setRib472(value: boolean): void;
readonly rib473: boolean;
setRib473(value: boolean): void;
readonly rib474: boolean;
setRib474(value: boolean): void;
readonly rib475: boolean;
setRib475(value: boolean): void;
readonly rib476: boolean;
setRib476(value: boolean): void;
readonly rib477: boolean;
setRib477(value: boolean): void;
readonly recordFlags: Uint8Array;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionGalar: boolean;
setRibbonChampionGalar(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionPaldea: boolean;
setRibbonChampionPaldea(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonHisui: boolean;
setRibbonHisui(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMarkAbsentMinded: boolean;
setRibbonMarkAbsentMinded(value: boolean): void;
readonly ribbonMarkAlpha: boolean;
setRibbonMarkAlpha(value: boolean): void;
readonly ribbonMarkAngry: boolean;
setRibbonMarkAngry(value: boolean): void;
readonly ribbonMarkBlizzard: boolean;
setRibbonMarkBlizzard(value: boolean): void;
readonly ribbonMarkCalmness: boolean;
setRibbonMarkCalmness(value: boolean): void;
readonly ribbonMarkCharismatic: boolean;
setRibbonMarkCharismatic(value: boolean): void;
readonly ribbonMarkCloudy: boolean;
setRibbonMarkCloudy(value: boolean): void;
readonly ribbonMarkCount: number;
readonly ribbonMarkCrafty: boolean;
setRibbonMarkCrafty(value: boolean): void;
readonly ribbonMarkCurry: boolean;
setRibbonMarkCurry(value: boolean): void;
readonly ribbonMarkDawn: boolean;
setRibbonMarkDawn(value: boolean): void;
readonly ribbonMarkDestiny: boolean;
setRibbonMarkDestiny(value: boolean): void;
readonly ribbonMarkDry: boolean;
setRibbonMarkDry(value: boolean): void;
readonly ribbonMarkDusk: boolean;
setRibbonMarkDusk(value: boolean): void;
readonly ribbonMarkExcited: boolean;
setRibbonMarkExcited(value: boolean): void;
readonly ribbonMarkFerocious: boolean;
setRibbonMarkFerocious(value: boolean): void;
readonly ribbonMarkFishing: boolean;
setRibbonMarkFishing(value: boolean): void;
readonly ribbonMarkFlustered: boolean;
setRibbonMarkFlustered(value: boolean): void;
readonly ribbonMarkGourmand: boolean;
setRibbonMarkGourmand(value: boolean): void;
readonly ribbonMarkHumble: boolean;
setRibbonMarkHumble(value: boolean): void;
readonly ribbonMarkIntellectual: boolean;
setRibbonMarkIntellectual(value: boolean): void;
readonly ribbonMarkIntense: boolean;
setRibbonMarkIntense(value: boolean): void;
readonly ribbonMarkItemfinder: boolean;
setRibbonMarkItemfinder(value: boolean): void;
readonly ribbonMarkJittery: boolean;
setRibbonMarkJittery(value: boolean): void;
readonly ribbonMarkJoyful: boolean;
setRibbonMarkJoyful(value: boolean): void;
readonly ribbonMarkJumbo: boolean;
setRibbonMarkJumbo(value: boolean): void;
readonly ribbonMarkKindly: boolean;
setRibbonMarkKindly(value: boolean): void;
readonly ribbonMarkLunchtime: boolean;
setRibbonMarkLunchtime(value: boolean): void;
readonly ribbonMarkMightiest: boolean;
setRibbonMarkMightiest(value: boolean): void;
readonly ribbonMarkMini: boolean;
setRibbonMarkMini(value: boolean): void;
readonly ribbonMarkMisty: boolean;
setRibbonMarkMisty(value: boolean): void;
readonly ribbonMarkPartner: boolean;
setRibbonMarkPartner(value: boolean): void;
readonly ribbonMarkPeeved: boolean;
setRibbonMarkPeeved(value: boolean): void;
readonly ribbonMarkPrideful: boolean;
setRibbonMarkPrideful(value: boolean): void;
readonly ribbonMarkPumpedUp: boolean;
setRibbonMarkPumpedUp(value: boolean): void;
readonly ribbonMarkRainy: boolean;
setRibbonMarkRainy(value: boolean): void;
readonly ribbonMarkRare: boolean;
setRibbonMarkRare(value: boolean): void;
readonly ribbonMarkRowdy: boolean;
setRibbonMarkRowdy(value: boolean): void;
readonly ribbonMarkSandstorm: boolean;
setRibbonMarkSandstorm(value: boolean): void;
readonly ribbonMarkScowling: boolean;
setRibbonMarkScowling(value: boolean): void;
readonly ribbonMarkSleepyTime: boolean;
setRibbonMarkSleepyTime(value: boolean): void;
readonly ribbonMarkSlump: boolean;
setRibbonMarkSlump(value: boolean): void;
readonly ribbonMarkSmiley: boolean;
setRibbonMarkSmiley(value: boolean): void;
readonly ribbonMarkSnowy: boolean;
setRibbonMarkSnowy(value: boolean): void;
readonly ribbonMarkStormy: boolean;
setRibbonMarkStormy(value: boolean): void;
readonly ribbonMarkTeary: boolean;
setRibbonMarkTeary(value: boolean): void;
readonly ribbonMarkThorny: boolean;
setRibbonMarkThorny(value: boolean): void;
readonly ribbonMarkTitan: boolean;
setRibbonMarkTitan(value: boolean): void;
readonly ribbonMarkUncommon: boolean;
setRibbonMarkUncommon(value: boolean): void;
readonly ribbonMarkUnsure: boolean;
setRibbonMarkUnsure(value: boolean): void;
readonly ribbonMarkUpbeat: boolean;
setRibbonMarkUpbeat(value: boolean): void;
readonly ribbonMarkVigor: boolean;
setRibbonMarkVigor(value: boolean): void;
readonly ribbonMarkZeroEnergy: boolean;
setRibbonMarkZeroEnergy(value: boolean): void;
readonly ribbonMarkZonedOut: boolean;
setRibbonMarkZonedOut(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterRank: boolean;
setRibbonMasterRank(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonOnceInAlifetime: boolean;
setRibbonOnceInAlifetime(value: boolean): void;
readonly ribbonPartner: boolean;
setRibbonPartner(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTowerMaster: boolean;
setRibbonTowerMaster(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonTwinklingStar: boolean;
setRibbonTwinklingStar(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
setMoveRecordFlag(index: number, value: boolean): void;
setPokeJobFlag(index: number, value: boolean): void;
setRibbon(index: number, value: boolean): void;
readonly sociability: number;
setSociability(value: number): void;
readonly tracker: bigint;
setTracker(value: bigint): void;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

/**
 * Projected from `PKHeX.Core.GBPKM`.
 * Kind: abstract.
 */
export interface GBPKM extends PKM {
readonly dv16: number;
setDv16(value: number): void;
readonly evSpc: number;
setEvSpc(value: number): void;
guessedLanguage(fallback: number): number;
readonly ivSpc: number;
setIvSpc(value: number): void;
isSpeciesNameMatch(language: number): boolean;
maxEvs(): void;
setNotNicknamed(): void;
setNotNicknamed(language: number): void;
setSqrtEvs(evs: readonly number[]): void;
}

/**
 * Projected from `PKHeX.Core.GBPKML`.
 * Kind: abstract.
 */
export interface GBPKML extends PKM {
}

/**
 * Projected from `PKHeX.Core.IDaycareEggState`.
 * Kind: interface.
 */
export interface IDaycareEggState {
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.IDaycareExperience`.
 * Kind: interface.
 */
export interface IDaycareExperience {
getDaycareexp(index: number): number;
setDaycareexp(index: number, value: number): void;
}

/**
 * Projected from `PKHeX.Core.IDaycareMulti`.
 * Kind: interface.
 */
export interface IDaycareMulti {
readonly daycareCount: number;
}

/**
 * Projected from `PKHeX.Core.IDaycareRandomState`1`.
 * Kind: interface.
 */
export interface IDaycareRandomState<T> {
readonly seed: T;
setSeed(value: T): void;
}

/**
 * Projected from `PKHeX.Core.IDaycareStorage`.
 * Kind: interface.
 */
export interface IDaycareStorage {
readonly daycareSlotCount: number;
getDaycareSlot(index: number): Uint8Array;
isDaycareOccupied(index: number): boolean;
setDaycareOccupied(index: number, occupied: boolean): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch`.
 * Kind: abstract.
 */
export interface InventoryPouch {
canContain(itemID: number): boolean;
/** Clears all item slots with a quantity of zero and shifts any subsequent item slot up. */
clearCount0(): void;
/** Count of item slots occupied in the pouch. */
readonly count: number;
findIndexFirstEmptySlot(): number;
getAllItems(): readonly number[];
getEmpty(itemID: number, count: number): InventoryItem;
getPouch(data: Uint8Array): void;
giveAllItems(bag: PlayerBag, count: number): void;
giveAllItems(bag: PlayerBag, newItems: readonly number[], count: number): void;
giveItem(bag: PlayerBag, itemID: number, count: number): number;
hasItem(itemID: number): boolean;
/** Checks if the player may run out of bag space when there are too many unique items to fit into the pouch. */
readonly isCramped: boolean;
readonly items: readonly InventoryItem[];
/** Max quantity for a given item that can be stored in the pouch. */
readonly maxCount: number;
setMaxCount(value: number): void;
modifyAllCount(value: number, modifyCriteria: (arg0: InventoryItem, arg1: number) => boolean): void;
modifyAllCount(bag: PlayerBag, count: number): void;
modifyAllCount(value: number, modifyCriteria: (arg0: InventoryItem) => boolean): void;
modifyAllCount(value: number): void;
/** Clears all items in the pouch. */
removeAll(): void;
/** Clears all items in the pouch. */
removeAll(deleteCriteria: (arg0: InventoryItem) => boolean): void;
/** Clears all items in the pouch. */
removeAll(deleteCriteria: (arg0: InventoryItem, arg1: number) => boolean): void;
sanitize(maxItemID: number, HaX: boolean): void;
setPouch(data: Uint8Array): void;
sortBy(selector: (arg0: TItem) => TCompare): void;
sortByCount(reverse: boolean): void;
sortByEmpty(): void;
sortByIndex(reverse: boolean): void;
sortByName(names: readonly string[], reverse: boolean): void;
readonly type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones";
setType(value: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones"): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch3`.
 * Kind: class.
 */
export interface InventoryPouch3 extends InventoryPouch {
}

/**
 * Projected from `PKHeX.Core.InventoryPouch3GC`.
 * Kind: class.
 */
export interface InventoryPouch3GC extends InventoryPouch {
}

/**
 * Projected from `PKHeX.Core.InventoryPouch4`.
 * Kind: class.
 */
export interface InventoryPouch4 extends InventoryPouch {
}

/**
 * Projected from `PKHeX.Core.InventoryPouch7`.
 * Kind: class.
 */
export interface InventoryPouch7 extends InventoryPouch {
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch7b`.
 * Kind: class.
 */
export interface InventoryPouch7b extends InventoryPouch {
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch8`.
 * Kind: class.
 */
export interface InventoryPouch8 extends InventoryPouch {
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch8a`.
 * Kind: class.
 */
export interface InventoryPouch8a extends InventoryPouch {
}

export declare namespace InventoryPouch8a {
function getItem(data: Uint8Array, ofs: number): InventoryItem8a;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch8b`.
 * Kind: class.
 */
export interface InventoryPouch8b extends InventoryPouch {
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

export declare namespace InventoryPouch8b {
function clearItem(data: Uint8Array, index: number): void;
function getItemOffset(index: number): number;
function readItem(data: Uint8Array, itemID: number): InventoryItem8b;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch9`.
 * Kind: class.
 */
export interface InventoryPouch9 extends InventoryPouch {
readonly pouchIndex: number;
setPouchIndex(value: number): void;
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

export declare namespace InventoryPouch9 {
function getItemOffset(index: number): number;
function getItemSpan(block: Uint8Array, index: number): Uint8Array;
function readItem(block: Uint8Array, itemID: number): InventoryItem9;
function setQuantityZero(block: Uint8Array, index: number): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouch9a`.
 * Kind: class.
 */
export interface InventoryPouch9a extends InventoryPouch {
readonly pouchIndex: number;
setPouchIndex(value: number): void;
readonly setNew: boolean;
setSetNew(value: boolean): void;
}

export declare namespace InventoryPouch9a {
function getItemOffset(index: number): number;
function getItemSpan(block: Uint8Array, index: number): Uint8Array;
function readItem(block: Uint8Array, itemID: number): InventoryItem9a;
function setQuantityZero(block: Uint8Array, index: number): void;
}

/**
 * Projected from `PKHeX.Core.InventoryPouchGB`.
 * Kind: class.
 */
export interface InventoryPouchGB extends InventoryPouch {
}

/**
 * Projected from `PKHeX.Core.PA8` (Gen8a).
 * Kind: class.
 */
export interface PA8 extends PKM {
readonly affixedRibbon: number;
setAffixedRibbon(value: number): void;
readonly alphaMove: number;
setAlphaMove(value: number): void;
readonly battleVersion: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setBattleVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
belongsTo(tr: ITrainerInfo): boolean;
readonly calcHeightAbsolute: number;
readonly calcWeightAbsolute: number;
readonly canGigantamax: boolean;
setCanGigantamax(value: boolean): void;
readonly checksum: number;
setChecksum(value: number): void;
clearMoveRecordFlags(): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
readonly dynamaxLevel: number;
setDynamaxLevel(value: number): void;
readonly enjoyment: number;
setEnjoyment(value: number): void;
fixMemories(): void;
fixRelearn(): void;
readonly flag2: boolean;
setFlag2(value: boolean): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly fullness: number;
setFullness(value: number): void;
readonly gvAtk: number;
setGvAtk(value: number): void;
readonly gvDef: number;
setGvDef(value: number): void;
readonly gvHp: number;
setGvHp(value: number): void;
readonly gvSpa: number;
setGvSpa(value: number): void;
readonly gvSpd: number;
setGvSpd(value: number): void;
readonly gvSpe: number;
setGvSpe(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
getMasteredRecordFlag(index: number): boolean;
getMasteredRecordFlagAny(): boolean;
getMoveRecordFlag(index: number): boolean;
getMoveRecordFlagAny(): boolean;
getPurchasedCount(): number;
getPurchasedRecordFlag(index: number): boolean;
getPurchasedRecordFlagAny(): boolean;
getRibbon(index: number): boolean;
getRibbonByte(index: number): number;
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerid: number;
setHandlingTrainerid(value: number): void;
readonly handlingTrainerLanguage: number;
setHandlingTrainerLanguage(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly hasMarkEncounter8: boolean;
readonly hasMarkEncounter9: boolean;
readonly heightAbsolute: number;
setHeightAbsolute(value: number): void;
readonly heightRatio: number;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly iv32: number;
setIv32(value: number): void;
readonly isAlpha: boolean;
setIsAlpha(value: boolean): void;
readonly isFavorite: boolean;
setIsFavorite(value: boolean): void;
readonly isNoble: boolean;
setIsNoble(value: boolean): void;
readonly markCount: number;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly masteredRecord: Uint8Array;
readonly moveRecordFlags: Uint8Array;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly permit: IPermitRecord;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly purchasedRecord: Uint8Array;
readonly rib457: boolean;
setRib457(value: boolean): void;
readonly rib460: boolean;
setRib460(value: boolean): void;
readonly rib461: boolean;
setRib461(value: boolean): void;
readonly rib462: boolean;
setRib462(value: boolean): void;
readonly rib463: boolean;
setRib463(value: boolean): void;
readonly rib464: boolean;
setRib464(value: boolean): void;
readonly rib465: boolean;
setRib465(value: boolean): void;
readonly rib466: boolean;
setRib466(value: boolean): void;
readonly rib467: boolean;
setRib467(value: boolean): void;
readonly rib470: boolean;
setRib470(value: boolean): void;
readonly rib471: boolean;
setRib471(value: boolean): void;
readonly rib472: boolean;
setRib472(value: boolean): void;
readonly rib473: boolean;
setRib473(value: boolean): void;
readonly rib474: boolean;
setRib474(value: boolean): void;
readonly rib475: boolean;
setRib475(value: boolean): void;
readonly rib476: boolean;
setRib476(value: boolean): void;
readonly rib477: boolean;
setRib477(value: boolean): void;
resetHeight(): void;
resetWeight(): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionGalar: boolean;
setRibbonChampionGalar(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionPaldea: boolean;
setRibbonChampionPaldea(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonHisui: boolean;
setRibbonHisui(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMarkAbsentMinded: boolean;
setRibbonMarkAbsentMinded(value: boolean): void;
readonly ribbonMarkAlpha: boolean;
setRibbonMarkAlpha(value: boolean): void;
readonly ribbonMarkAngry: boolean;
setRibbonMarkAngry(value: boolean): void;
readonly ribbonMarkBlizzard: boolean;
setRibbonMarkBlizzard(value: boolean): void;
readonly ribbonMarkCalmness: boolean;
setRibbonMarkCalmness(value: boolean): void;
readonly ribbonMarkCharismatic: boolean;
setRibbonMarkCharismatic(value: boolean): void;
readonly ribbonMarkCloudy: boolean;
setRibbonMarkCloudy(value: boolean): void;
readonly ribbonMarkCount: number;
readonly ribbonMarkCrafty: boolean;
setRibbonMarkCrafty(value: boolean): void;
readonly ribbonMarkCurry: boolean;
setRibbonMarkCurry(value: boolean): void;
readonly ribbonMarkDawn: boolean;
setRibbonMarkDawn(value: boolean): void;
readonly ribbonMarkDestiny: boolean;
setRibbonMarkDestiny(value: boolean): void;
readonly ribbonMarkDry: boolean;
setRibbonMarkDry(value: boolean): void;
readonly ribbonMarkDusk: boolean;
setRibbonMarkDusk(value: boolean): void;
readonly ribbonMarkExcited: boolean;
setRibbonMarkExcited(value: boolean): void;
readonly ribbonMarkFerocious: boolean;
setRibbonMarkFerocious(value: boolean): void;
readonly ribbonMarkFishing: boolean;
setRibbonMarkFishing(value: boolean): void;
readonly ribbonMarkFlustered: boolean;
setRibbonMarkFlustered(value: boolean): void;
readonly ribbonMarkGourmand: boolean;
setRibbonMarkGourmand(value: boolean): void;
readonly ribbonMarkHumble: boolean;
setRibbonMarkHumble(value: boolean): void;
readonly ribbonMarkIntellectual: boolean;
setRibbonMarkIntellectual(value: boolean): void;
readonly ribbonMarkIntense: boolean;
setRibbonMarkIntense(value: boolean): void;
readonly ribbonMarkItemfinder: boolean;
setRibbonMarkItemfinder(value: boolean): void;
readonly ribbonMarkJittery: boolean;
setRibbonMarkJittery(value: boolean): void;
readonly ribbonMarkJoyful: boolean;
setRibbonMarkJoyful(value: boolean): void;
readonly ribbonMarkJumbo: boolean;
setRibbonMarkJumbo(value: boolean): void;
readonly ribbonMarkKindly: boolean;
setRibbonMarkKindly(value: boolean): void;
readonly ribbonMarkLunchtime: boolean;
setRibbonMarkLunchtime(value: boolean): void;
readonly ribbonMarkMightiest: boolean;
setRibbonMarkMightiest(value: boolean): void;
readonly ribbonMarkMini: boolean;
setRibbonMarkMini(value: boolean): void;
readonly ribbonMarkMisty: boolean;
setRibbonMarkMisty(value: boolean): void;
readonly ribbonMarkPartner: boolean;
setRibbonMarkPartner(value: boolean): void;
readonly ribbonMarkPeeved: boolean;
setRibbonMarkPeeved(value: boolean): void;
readonly ribbonMarkPrideful: boolean;
setRibbonMarkPrideful(value: boolean): void;
readonly ribbonMarkPumpedUp: boolean;
setRibbonMarkPumpedUp(value: boolean): void;
readonly ribbonMarkRainy: boolean;
setRibbonMarkRainy(value: boolean): void;
readonly ribbonMarkRare: boolean;
setRibbonMarkRare(value: boolean): void;
readonly ribbonMarkRowdy: boolean;
setRibbonMarkRowdy(value: boolean): void;
readonly ribbonMarkSandstorm: boolean;
setRibbonMarkSandstorm(value: boolean): void;
readonly ribbonMarkScowling: boolean;
setRibbonMarkScowling(value: boolean): void;
readonly ribbonMarkSleepyTime: boolean;
setRibbonMarkSleepyTime(value: boolean): void;
readonly ribbonMarkSlump: boolean;
setRibbonMarkSlump(value: boolean): void;
readonly ribbonMarkSmiley: boolean;
setRibbonMarkSmiley(value: boolean): void;
readonly ribbonMarkSnowy: boolean;
setRibbonMarkSnowy(value: boolean): void;
readonly ribbonMarkStormy: boolean;
setRibbonMarkStormy(value: boolean): void;
readonly ribbonMarkTeary: boolean;
setRibbonMarkTeary(value: boolean): void;
readonly ribbonMarkThorny: boolean;
setRibbonMarkThorny(value: boolean): void;
readonly ribbonMarkTitan: boolean;
setRibbonMarkTitan(value: boolean): void;
readonly ribbonMarkUncommon: boolean;
setRibbonMarkUncommon(value: boolean): void;
readonly ribbonMarkUnsure: boolean;
setRibbonMarkUnsure(value: boolean): void;
readonly ribbonMarkUpbeat: boolean;
setRibbonMarkUpbeat(value: boolean): void;
readonly ribbonMarkVigor: boolean;
setRibbonMarkVigor(value: boolean): void;
readonly ribbonMarkZeroEnergy: boolean;
setRibbonMarkZeroEnergy(value: boolean): void;
readonly ribbonMarkZonedOut: boolean;
setRibbonMarkZonedOut(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterRank: boolean;
setRibbonMasterRank(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonOnceInAlifetime: boolean;
setRibbonOnceInAlifetime(value: boolean): void;
readonly ribbonPartner: boolean;
setRibbonPartner(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTowerMaster: boolean;
setRibbonTowerMaster(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonTwinklingStar: boolean;
setRibbonTwinklingStar(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
readonly scale: number;
setScale(value: number): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
setMasteredRecordFlag(index: number, value: boolean): void;
setMasteryFlagMove(move: number): void;
setMasteryFlags(): void;
setMoveRecordFlag(index: number, value: boolean): void;
setPurchasedRecordFlag(index: number, value: boolean): void;
setRibbon(index: number, value: boolean): void;
readonly sociability: number;
setSociability(value: number): void;
readonly tracker: bigint;
setTracker(value: bigint): void;
readonly unka0: number;
setUnka0(value: number): void;
readonly unkf3: number;
setUnkf3(value: number): void;
updateHandler(tr: ITrainerInfo): void;
readonly weightAbsolute: number;
setWeightAbsolute(value: number): void;
readonly weightRatio: number;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

export declare namespace PA8 {
function getGanbaruStat(baseStat: number, iv: number, gv: number, level: number): number;
function getHeightAbsolute(p: IPersonalMisc, heightScalar: number): number;
function getHeightScalar(height: number, avgHeight: number): number;
function getStat(baseStat: number, level: number, nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random", statIndex: number): number;
function getStatHp(baseStat: number, level: number): number;
function getWeightAbsolute(p: IPersonalMisc, heightScalar: number, weightScalar: number): number;
function getWeightScalar(height: number, weight: number, avgHeight: number, avgWeight: number): number;
}

/**
 * Projected from `PKHeX.Core.PA9` (Gen9a).
 * Kind: class.
 */
export interface PA9 extends PKM {
readonly affixedRibbon: number;
setAffixedRibbon(value: number): void;
readonly battleVersion: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setBattleVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
belongsTo(tr: ITrainerInfo): boolean;
belongsToSkipVersion(tr: ITrainerInfo): boolean;
readonly checksum: number;
setChecksum(value: number): void;
clearMovePlusFlags(): void;
clearMoveRecordFlags(): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
fixMemories(): void;
fixRelearn(): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
getMovePlusFlag(index: number): boolean;
getMovePlusFlagAny(): boolean;
getMovePlusFlagAnyImpossible(): boolean;
getMoveRecordFlag(index: number): boolean;
getMoveRecordFlagAny(): boolean;
getRibbon(index: number): boolean;
getRibbonByte(index: number): number;
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerid: number;
setHandlingTrainerid(value: number): void;
readonly handlingTrainerLanguage: number;
setHandlingTrainerLanguage(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly hasMarkEncounter8: boolean;
readonly hasMarkEncounter9: boolean;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly iv32: number;
setIv32(value: number): void;
readonly isAlpha: boolean;
setIsAlpha(value: boolean): void;
readonly isFavorite: boolean;
setIsFavorite(value: boolean): void;
readonly isUnhatchedEgg: boolean;
readonly levelBoost: number;
setLevelBoost(value: number): void;
readonly markCount: number;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly obedienceLevel: number;
setObedienceLevel(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly permit: IPermitRecord;
readonly plusFlags0: Uint8Array;
readonly plusFlags1: Uint8Array;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib457: boolean;
setRib457(value: boolean): void;
readonly rib460: boolean;
setRib460(value: boolean): void;
readonly rib461: boolean;
setRib461(value: boolean): void;
readonly rib462: boolean;
setRib462(value: boolean): void;
readonly rib463: boolean;
setRib463(value: boolean): void;
readonly rib464: boolean;
setRib464(value: boolean): void;
readonly rib465: boolean;
setRib465(value: boolean): void;
readonly rib466: boolean;
setRib466(value: boolean): void;
readonly rib467: boolean;
setRib467(value: boolean): void;
readonly rib470: boolean;
setRib470(value: boolean): void;
readonly rib471: boolean;
setRib471(value: boolean): void;
readonly rib472: boolean;
setRib472(value: boolean): void;
readonly rib473: boolean;
setRib473(value: boolean): void;
readonly rib474: boolean;
setRib474(value: boolean): void;
readonly rib475: boolean;
setRib475(value: boolean): void;
readonly rib476: boolean;
setRib476(value: boolean): void;
readonly rib477: boolean;
setRib477(value: boolean): void;
readonly recordFlagsBase: Uint8Array;
readonly recordFlagsdlc: Uint8Array;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionGalar: boolean;
setRibbonChampionGalar(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionPaldea: boolean;
setRibbonChampionPaldea(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonHisui: boolean;
setRibbonHisui(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMarkAbsentMinded: boolean;
setRibbonMarkAbsentMinded(value: boolean): void;
readonly ribbonMarkAlpha: boolean;
setRibbonMarkAlpha(value: boolean): void;
readonly ribbonMarkAngry: boolean;
setRibbonMarkAngry(value: boolean): void;
readonly ribbonMarkBlizzard: boolean;
setRibbonMarkBlizzard(value: boolean): void;
readonly ribbonMarkCalmness: boolean;
setRibbonMarkCalmness(value: boolean): void;
readonly ribbonMarkCharismatic: boolean;
setRibbonMarkCharismatic(value: boolean): void;
readonly ribbonMarkCloudy: boolean;
setRibbonMarkCloudy(value: boolean): void;
readonly ribbonMarkCount: number;
readonly ribbonMarkCrafty: boolean;
setRibbonMarkCrafty(value: boolean): void;
readonly ribbonMarkCurry: boolean;
setRibbonMarkCurry(value: boolean): void;
readonly ribbonMarkDawn: boolean;
setRibbonMarkDawn(value: boolean): void;
readonly ribbonMarkDestiny: boolean;
setRibbonMarkDestiny(value: boolean): void;
readonly ribbonMarkDry: boolean;
setRibbonMarkDry(value: boolean): void;
readonly ribbonMarkDusk: boolean;
setRibbonMarkDusk(value: boolean): void;
readonly ribbonMarkExcited: boolean;
setRibbonMarkExcited(value: boolean): void;
readonly ribbonMarkFerocious: boolean;
setRibbonMarkFerocious(value: boolean): void;
readonly ribbonMarkFishing: boolean;
setRibbonMarkFishing(value: boolean): void;
readonly ribbonMarkFlustered: boolean;
setRibbonMarkFlustered(value: boolean): void;
readonly ribbonMarkGourmand: boolean;
setRibbonMarkGourmand(value: boolean): void;
readonly ribbonMarkHumble: boolean;
setRibbonMarkHumble(value: boolean): void;
readonly ribbonMarkIntellectual: boolean;
setRibbonMarkIntellectual(value: boolean): void;
readonly ribbonMarkIntense: boolean;
setRibbonMarkIntense(value: boolean): void;
readonly ribbonMarkItemfinder: boolean;
setRibbonMarkItemfinder(value: boolean): void;
readonly ribbonMarkJittery: boolean;
setRibbonMarkJittery(value: boolean): void;
readonly ribbonMarkJoyful: boolean;
setRibbonMarkJoyful(value: boolean): void;
readonly ribbonMarkJumbo: boolean;
setRibbonMarkJumbo(value: boolean): void;
readonly ribbonMarkKindly: boolean;
setRibbonMarkKindly(value: boolean): void;
readonly ribbonMarkLunchtime: boolean;
setRibbonMarkLunchtime(value: boolean): void;
readonly ribbonMarkMightiest: boolean;
setRibbonMarkMightiest(value: boolean): void;
readonly ribbonMarkMini: boolean;
setRibbonMarkMini(value: boolean): void;
readonly ribbonMarkMisty: boolean;
setRibbonMarkMisty(value: boolean): void;
readonly ribbonMarkPartner: boolean;
setRibbonMarkPartner(value: boolean): void;
readonly ribbonMarkPeeved: boolean;
setRibbonMarkPeeved(value: boolean): void;
readonly ribbonMarkPrideful: boolean;
setRibbonMarkPrideful(value: boolean): void;
readonly ribbonMarkPumpedUp: boolean;
setRibbonMarkPumpedUp(value: boolean): void;
readonly ribbonMarkRainy: boolean;
setRibbonMarkRainy(value: boolean): void;
readonly ribbonMarkRare: boolean;
setRibbonMarkRare(value: boolean): void;
readonly ribbonMarkRowdy: boolean;
setRibbonMarkRowdy(value: boolean): void;
readonly ribbonMarkSandstorm: boolean;
setRibbonMarkSandstorm(value: boolean): void;
readonly ribbonMarkScowling: boolean;
setRibbonMarkScowling(value: boolean): void;
readonly ribbonMarkSleepyTime: boolean;
setRibbonMarkSleepyTime(value: boolean): void;
readonly ribbonMarkSlump: boolean;
setRibbonMarkSlump(value: boolean): void;
readonly ribbonMarkSmiley: boolean;
setRibbonMarkSmiley(value: boolean): void;
readonly ribbonMarkSnowy: boolean;
setRibbonMarkSnowy(value: boolean): void;
readonly ribbonMarkStormy: boolean;
setRibbonMarkStormy(value: boolean): void;
readonly ribbonMarkTeary: boolean;
setRibbonMarkTeary(value: boolean): void;
readonly ribbonMarkThorny: boolean;
setRibbonMarkThorny(value: boolean): void;
readonly ribbonMarkTitan: boolean;
setRibbonMarkTitan(value: boolean): void;
readonly ribbonMarkUncommon: boolean;
setRibbonMarkUncommon(value: boolean): void;
readonly ribbonMarkUnsure: boolean;
setRibbonMarkUnsure(value: boolean): void;
readonly ribbonMarkUpbeat: boolean;
setRibbonMarkUpbeat(value: boolean): void;
readonly ribbonMarkVigor: boolean;
setRibbonMarkVigor(value: boolean): void;
readonly ribbonMarkZeroEnergy: boolean;
setRibbonMarkZeroEnergy(value: boolean): void;
readonly ribbonMarkZonedOut: boolean;
setRibbonMarkZonedOut(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterRank: boolean;
setRibbonMasterRank(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonOnceInAlifetime: boolean;
setRibbonOnceInAlifetime(value: boolean): void;
readonly ribbonPartner: boolean;
setRibbonPartner(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTowerMaster: boolean;
setRibbonTowerMaster(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonTwinklingStar: boolean;
setRibbonTwinklingStar(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
readonly scale: number;
setScale(value: number): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
setMovePlusFlag(index: number, value: boolean): void;
setMoveRecordFlag(index: number, value: boolean): void;
setRibbon(index: number, value: boolean): void;
readonly speciesInternal: number;
setSpeciesInternal(value: number): void;
readonly tracker: bigint;
setTracker(value: bigint): void;
updateHandler(tr: ITrainerInfo): void;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PB7` (Gen7b).
 * Kind: class.
 */
export interface PB7 extends PKM {
readonly avAtk: number;
setAvAtk(value: number): void;
readonly avDef: number;
setAvDef(value: number): void;
readonly avHp: number;
setAvHp(value: number): void;
readonly avSpa: number;
setAvSpa(value: number): void;
readonly avSpd: number;
setAvSpd(value: number): void;
readonly avSpe: number;
setAvSpe(value: number): void;
readonly awakecp: number;
readonly basecp: number;
readonly cpScalar: number;
readonly calccp: number;
readonly calcHeightAbsolute: number;
readonly calcWeightAbsolute: number;
readonly dirtLocation: number;
setDirtLocation(value: number): void;
readonly dirtType: number;
setDirtType(value: number): void;
readonly enjoyment: number;
setEnjoyment(value: number): void;
fixMemories(): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly fullness: number;
setFullness(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htFeeling: number;
setHtFeeling(value: number): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htIntensity: number;
setHtIntensity(value: number): void;
readonly htMemory: number;
setHtMemory(value: number): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly htTextVar: number;
setHtTextVar(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly heightAbsolute: number;
setHeightAbsolute(value: number): void;
readonly heightRatio: number;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly isFavorite: boolean;
setIsFavorite(value: boolean): void;
readonly isStarter: boolean;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly mood: number;
setMood(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib62: boolean;
setRib62(value: boolean): void;
readonly rib63: boolean;
setRib63(value: boolean): void;
readonly rib64: boolean;
setRib64(value: boolean): void;
readonly rib65: boolean;
setRib65(value: boolean): void;
readonly rib66: boolean;
setRib66(value: boolean): void;
readonly rib67: boolean;
setRib67(value: boolean): void;
readonly rank: number;
setRank(value: number): void;
readonly receivedDate: string | null;
setReceivedDate(value: string | null): void;
readonly receivedDay: number;
setReceivedDay(value: number): void;
readonly receivedHour: number;
setReceivedHour(value: number): void;
readonly receivedMinute: number;
setReceivedMinute(value: number): void;
readonly receivedMonth: number;
setReceivedMonth(value: number): void;
readonly receivedSecond: number;
setReceivedSecond(value: number): void;
readonly receivedTime: string | null;
setReceivedTime(value: string | null): void;
readonly receivedYear: number;
setReceivedYear(value: number): void;
resetcp(): void;
resetCalculatedValues(): void;
resetHeight(): void;
resetSpiritMood(): void;
resetWeight(): void;
readonly resortEventStatus: "NONE" | "SEIKAKU" | "CARE" | "LIKE_RESORT" | "LIKE_BATTLE" | "LIKE_ADV" | "GOOD_FRIEND" | "GIM" | "HOTSPA" | "WILD" | "WILD_LOVE" | "WILD_LIVE" | "POKEMAME_GET1" | "POKEMAME_GET2" | "POKEMAME_GET3" | "KINOMI_HELP" | "PLAY_STATE" | "HOTSPA_STATE" | "HOTSPA_DIZZY" | "HOTSPA_EGG_HATCHING" | "MAX";
setResortEventStatus(value: "NONE" | "SEIKAKU" | "CARE" | "LIKE_RESORT" | "LIKE_BATTLE" | "LIKE_ADV" | "GOOD_FRIEND" | "GIM" | "HOTSPA" | "WILD" | "WILD_LOVE" | "WILD_LIVE" | "POKEMAME_GET1" | "POKEMAME_GET2" | "POKEMAME_GET3" | "KINOMI_HELP" | "PLAY_STATE" | "HOTSPA_STATE" | "HOTSPA_DIZZY" | "HOTSPA_EGG_HATCHING" | "MAX"): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
readonly spirit: number;
setSpirit(value: number): void;
readonly statCp: number;
setStatCp(value: number): void;
readonly statMega: boolean;
setStatMega(value: boolean): void;
readonly statMegaForm: number;
setStatMegaForm(value: number): void;
readonly weightAbsolute: number;
setWeightAbsolute(value: number): void;
readonly weightRatio: number;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

export declare namespace PB7 {
function getHeightAbsolute(p: IPersonalMisc, heightScalar: number): number;
function getHeightScalar(height: number, avgHeight: number): number;
function getRandomIndex(bits: number, characterIndex: number, nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random"): number;
function getWeightAbsolute(p: IPersonalMisc, heightScalar: number, weightScalar: number): number;
function getWeightScalar(height: number, weight: number, avgHeight: number, avgWeight: number): number;
const initialSpiritMood: number;
function setInitialSpiritMood(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PB8` (Gen8b).
 * Kind: class.
 */
export interface PB8 extends PKM {
belongsTo(tr: ITrainerInfo): boolean;
fixMemories(): void;
readonly isDprIllegal: boolean;
setIsDprIllegal(value: boolean): void;
updateHandler(tr: ITrainerInfo): void;
}

/**
 * Projected from `PKHeX.Core.PK1` (Gen1).
 * Kind: class.
 */
export interface PK1 extends PKM {
readonly catchRate: number;
setCatchRate(value: number): void;
convertTopk2(): PK2;
convertTopk7(): PK7;
readonly gen2Item: number;
/** Gets a checksum over all the entity's data using a single list to wrap all components. */
getSingleListChecksum(): number;
setTypes(pi: T): void;
readonly speciesInternal: number;
setSpeciesInternal(value: number): void;
readonly statLevelBox: number;
setStatLevelBox(value: number): void;
readonly statSpc: number;
setStatSpc(value: number): void;
readonly type1: number;
setType1(value: number): void;
readonly type2: number;
setType2(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PK2` (Gen2).
 * Kind: class.
 */
export interface PK2 extends PKM {
readonly caughtData: number;
setCaughtData(value: number): void;
convertTopk1(): PK1;
convertTopk7(): PK7;
convertTosk2(): SK2;
/** Gets a checksum over all the entity's data using a single list to wrap all components. */
getSingleListChecksum(): number;
readonly metTimeOfDay: number;
setMetTimeOfDay(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly speciesInternal: number;
setSpeciesInternal(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PK3` (Gen3).
 * Kind: class.
 */
export interface PK3 extends PKM {
readonly checksum: number;
setChecksum(value: number): void;
convertTock3(): CK3;
convertTopk4(): PK4;
convertToxk3(): XK3;
readonly flagHasSpecies: boolean;
setFlagHasSpecies(value: boolean): void;
readonly flagIsBadEgg: boolean;
setFlagIsBadEgg(value: boolean): void;
readonly flagIsEgg: boolean;
setFlagIsEgg(value: boolean): void;
getNicknamePrefillRegion(): Uint8Array;
readonly heldMailid: number;
setHeldMailid(value: number): void;
readonly iv32: number;
setIv32(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly sanity: number;
setSanity(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PK4` (Gen4).
 * Kind: class.
 */
export interface PK4 extends PKM {
readonly ballCapsuleIndex: number;
setBallCapsuleIndex(value: number): void;
convertTobk4(): BK4;
convertTopk5(): PK5;
convertTork4(): RK4;
readonly heldMail: Uint8Array;
readonly seals: Uint8Array;
}

export declare namespace PK4 {
function transferTrash(src: Uint8Array, dest: Uint8Array, language: number): void;
}

/**
 * Projected from `PKHeX.Core.PK5` (Gen5).
 * Kind: class.
 */
export interface PK5 extends PKM {
belongsTo(tr: ITrainerInfo): boolean;
readonly checksum: number;
setChecksum(value: number): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
convertTopk6(): PK6;
getMarking(index: number): boolean;
readonly groundTile: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt";
setGroundTile(value: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt"): void;
readonly heldMail: Uint8Array;
readonly hiddenAbility: boolean;
setHiddenAbility(value: boolean): void;
readonly iv32: number;
setIv32(value: number): void;
readonly isPokeStar: boolean;
setIsPokeStar(value: boolean): void;
/** , now unused. */
readonly junkByte: number;
setJunkByte(value: number): void;
readonly junkData: bigint;
setJunkData(value: bigint): void;
readonly markingCircle: boolean;
setMarkingCircle(value: boolean): void;
readonly markingCount: number;
readonly markingDiamond: boolean;
setMarkingDiamond(value: boolean): void;
readonly markingHeart: boolean;
setMarkingHeart(value: boolean): void;
readonly markingSquare: boolean;
setMarkingSquare(value: boolean): void;
readonly markingStar: boolean;
setMarkingStar(value: boolean): void;
readonly markingTriangle: boolean;
setMarkingTriangle(value: boolean): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly nsparkle: boolean;
setNsparkle(value: boolean): void;
readonly pokeStarFame: number;
setPokeStarFame(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib34: boolean;
setRib34(value: boolean): void;
readonly rib35: boolean;
setRib35(value: boolean): void;
readonly rib36: boolean;
setRib36(value: boolean): void;
readonly rib37: boolean;
setRib37(value: boolean): void;
readonly riba4: boolean;
setRiba4(value: boolean): void;
readonly riba5: boolean;
setRiba5(value: boolean): void;
readonly riba6: boolean;
setRiba6(value: boolean): void;
readonly riba7: boolean;
setRiba7(value: boolean): void;
readonly ribb0: boolean;
setRibb0(value: boolean): void;
readonly ribb1: boolean;
setRibb1(value: boolean): void;
readonly ribb2: boolean;
setRibb2(value: boolean): void;
readonly ribb3: boolean;
setRibb3(value: boolean): void;
readonly ribb4: boolean;
setRibb4(value: boolean): void;
readonly ribb5: boolean;
setRibb5(value: boolean): void;
readonly ribb6: boolean;
setRibb6(value: boolean): void;
readonly ribb7: boolean;
setRibb7(value: boolean): void;
readonly ribbonAbility: boolean;
setRibbonAbility(value: boolean): void;
readonly ribbonAbilityDouble: boolean;
setRibbonAbilityDouble(value: boolean): void;
readonly ribbonAbilityGreat: boolean;
setRibbonAbilityGreat(value: boolean): void;
readonly ribbonAbilityMulti: boolean;
setRibbonAbilityMulti(value: boolean): void;
readonly ribbonAbilityPair: boolean;
setRibbonAbilityPair(value: boolean): void;
readonly ribbonAbilityWorld: boolean;
setRibbonAbilityWorld(value: boolean): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbong3Beauty: boolean;
setRibbong3Beauty(value: boolean): void;
readonly ribbong3BeautyHyper: boolean;
setRibbong3BeautyHyper(value: boolean): void;
readonly ribbong3BeautyMaster: boolean;
setRibbong3BeautyMaster(value: boolean): void;
readonly ribbong3BeautySuper: boolean;
setRibbong3BeautySuper(value: boolean): void;
readonly ribbong3Cool: boolean;
setRibbong3Cool(value: boolean): void;
readonly ribbong3CoolHyper: boolean;
setRibbong3CoolHyper(value: boolean): void;
readonly ribbong3CoolMaster: boolean;
setRibbong3CoolMaster(value: boolean): void;
readonly ribbong3CoolSuper: boolean;
setRibbong3CoolSuper(value: boolean): void;
readonly ribbong3Cute: boolean;
setRibbong3Cute(value: boolean): void;
readonly ribbong3CuteHyper: boolean;
setRibbong3CuteHyper(value: boolean): void;
readonly ribbong3CuteMaster: boolean;
setRibbong3CuteMaster(value: boolean): void;
readonly ribbong3CuteSuper: boolean;
setRibbong3CuteSuper(value: boolean): void;
readonly ribbong3Smart: boolean;
setRibbong3Smart(value: boolean): void;
readonly ribbong3SmartHyper: boolean;
setRibbong3SmartHyper(value: boolean): void;
readonly ribbong3SmartMaster: boolean;
setRibbong3SmartMaster(value: boolean): void;
readonly ribbong3SmartSuper: boolean;
setRibbong3SmartSuper(value: boolean): void;
readonly ribbong3Tough: boolean;
setRibbong3Tough(value: boolean): void;
readonly ribbong3ToughHyper: boolean;
setRibbong3ToughHyper(value: boolean): void;
readonly ribbong3ToughMaster: boolean;
setRibbong3ToughMaster(value: boolean): void;
readonly ribbong3ToughSuper: boolean;
setRibbong3ToughSuper(value: boolean): void;
readonly ribbong4Beauty: boolean;
setRibbong4Beauty(value: boolean): void;
readonly ribbong4BeautyGreat: boolean;
setRibbong4BeautyGreat(value: boolean): void;
readonly ribbong4BeautyMaster: boolean;
setRibbong4BeautyMaster(value: boolean): void;
readonly ribbong4BeautyUltra: boolean;
setRibbong4BeautyUltra(value: boolean): void;
readonly ribbong4Cool: boolean;
setRibbong4Cool(value: boolean): void;
readonly ribbong4CoolGreat: boolean;
setRibbong4CoolGreat(value: boolean): void;
readonly ribbong4CoolMaster: boolean;
setRibbong4CoolMaster(value: boolean): void;
readonly ribbong4CoolUltra: boolean;
setRibbong4CoolUltra(value: boolean): void;
readonly ribbong4Cute: boolean;
setRibbong4Cute(value: boolean): void;
readonly ribbong4CuteGreat: boolean;
setRibbong4CuteGreat(value: boolean): void;
readonly ribbong4CuteMaster: boolean;
setRibbong4CuteMaster(value: boolean): void;
readonly ribbong4CuteUltra: boolean;
setRibbong4CuteUltra(value: boolean): void;
readonly ribbong4Smart: boolean;
setRibbong4Smart(value: boolean): void;
readonly ribbong4SmartGreat: boolean;
setRibbong4SmartGreat(value: boolean): void;
readonly ribbong4SmartMaster: boolean;
setRibbong4SmartMaster(value: boolean): void;
readonly ribbong4SmartUltra: boolean;
setRibbong4SmartUltra(value: boolean): void;
readonly ribbong4Tough: boolean;
setRibbong4Tough(value: boolean): void;
readonly ribbong4ToughGreat: boolean;
setRibbong4ToughGreat(value: boolean): void;
readonly ribbong4ToughMaster: boolean;
setRibbong4ToughMaster(value: boolean): void;
readonly ribbong4ToughUltra: boolean;
setRibbong4ToughUltra(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonVictory: boolean;
setRibbonVictory(value: boolean): void;
readonly ribbonWinning: boolean;
setRibbonWinning(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
setMarking(index: number, value: boolean): void;
updateHandler(tr: ITrainerInfo): void;
}

export declare namespace PK5 {
function getTransferpid(ec: number, oid: number, bitFlipProc: boolean): number;
}

/**
 * Projected from `PKHeX.Core.PK6` (Gen6).
 * Kind: class.
 */
export interface PK6 extends PKM {
readonly consoleRegion: number;
setConsoleRegion(value: number): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
convertTopk7(): PK7;
readonly country: number;
setCountry(value: number): void;
readonly dist7: boolean;
setDist7(value: boolean): void;
readonly dist8: boolean;
setDist8(value: boolean): void;
readonly distSuperTrain1: boolean;
setDistSuperTrain1(value: boolean): void;
readonly distSuperTrain2: boolean;
setDistSuperTrain2(value: boolean): void;
readonly distSuperTrain3: boolean;
setDistSuperTrain3(value: boolean): void;
readonly distSuperTrain4: boolean;
setDistSuperTrain4(value: boolean): void;
readonly distSuperTrain5: boolean;
setDistSuperTrain5(value: boolean): void;
readonly distSuperTrain6: boolean;
setDistSuperTrain6(value: boolean): void;
readonly distTrainBitFlags: number;
setDistTrainBitFlags(value: number): void;
readonly enjoyment: number;
setEnjoyment(value: number): void;
fixMemories(): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly fullness: number;
setFullness(value: number): void;
readonly geo1Country: number;
setGeo1Country(value: number): void;
readonly geo1Region: number;
setGeo1Region(value: number): void;
readonly geo2Country: number;
setGeo2Country(value: number): void;
readonly geo2Region: number;
setGeo2Region(value: number): void;
readonly geo3Country: number;
setGeo3Country(value: number): void;
readonly geo3Region: number;
setGeo3Region(value: number): void;
readonly geo4Country: number;
setGeo4Country(value: number): void;
readonly geo4Region: number;
setGeo4Region(value: number): void;
readonly geo5Country: number;
setGeo5Country(value: number): void;
readonly geo5Region: number;
setGeo5Region(value: number): void;
getMarking(index: number): boolean;
readonly groundTile: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt";
setGroundTile(value: "None" | "Sand" | "Grass" | "Puddle" | "Rock" | "Cave" | "Snow" | "Water" | "Ice" | "Building" | "Marsh" | "Bridge" | "Elite4_1" | "Max_DP" | "Elite4_2" | "Elite4_3" | "Elite4_4" | "Elite4_M" | "DistortionSideways" | "BattleTower" | "BattleFactory" | "BattleArcade" | "BattleCastle" | "BattleHall" | "Distortion" | "Max_Pt"): void;
readonly handlingTrainerAffection: number;
setHandlingTrainerAffection(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly isUntradedEvent6: boolean;
readonly markingCircle: boolean;
setMarkingCircle(value: boolean): void;
readonly markingCount: number;
readonly markingDiamond: boolean;
setMarkingDiamond(value: boolean): void;
readonly markingHeart: boolean;
setMarkingHeart(value: boolean): void;
readonly markingSquare: boolean;
setMarkingSquare(value: boolean): void;
readonly markingStar: boolean;
setMarkingStar(value: boolean): void;
readonly markingTriangle: boolean;
setMarkingTriangle(value: boolean): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly originalTrainerAffection: number;
setOriginalTrainerAffection(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib56: boolean;
setRib56(value: boolean): void;
readonly rib57: boolean;
setRib57(value: boolean): void;
readonly region: number;
setRegion(value: number): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly secretSuperTrainingUnlocked: boolean;
setSecretSuperTrainingUnlocked(value: boolean): void;
setMarking(index: number, value: boolean): void;
readonly superTrain1Atk: boolean;
setSuperTrain1Atk(value: boolean): void;
readonly superTrain1Def: boolean;
setSuperTrain1Def(value: boolean): void;
readonly superTrain1Hp: boolean;
setSuperTrain1Hp(value: boolean): void;
readonly superTrain1Spa: boolean;
setSuperTrain1Spa(value: boolean): void;
readonly superTrain1Spd: boolean;
setSuperTrain1Spd(value: boolean): void;
readonly superTrain1Spe: boolean;
setSuperTrain1Spe(value: boolean): void;
readonly superTrain2Atk: boolean;
setSuperTrain2Atk(value: boolean): void;
readonly superTrain2Def: boolean;
setSuperTrain2Def(value: boolean): void;
readonly superTrain2Hp: boolean;
setSuperTrain2Hp(value: boolean): void;
readonly superTrain2Spa: boolean;
setSuperTrain2Spa(value: boolean): void;
readonly superTrain2Spd: boolean;
setSuperTrain2Spd(value: boolean): void;
readonly superTrain2Spe: boolean;
setSuperTrain2Spe(value: boolean): void;
readonly superTrain3Atk: boolean;
setSuperTrain3Atk(value: boolean): void;
readonly superTrain3Def: boolean;
setSuperTrain3Def(value: boolean): void;
readonly superTrain3Hp: boolean;
setSuperTrain3Hp(value: boolean): void;
readonly superTrain3Spa: boolean;
setSuperTrain3Spa(value: boolean): void;
readonly superTrain3Spd: boolean;
setSuperTrain3Spd(value: boolean): void;
readonly superTrain3Spe: boolean;
setSuperTrain3Spe(value: boolean): void;
readonly superTrain41: boolean;
setSuperTrain41(value: boolean): void;
readonly superTrain51: boolean;
setSuperTrain51(value: boolean): void;
readonly superTrain52: boolean;
setSuperTrain52(value: boolean): void;
readonly superTrain53: boolean;
setSuperTrain53(value: boolean): void;
readonly superTrain54: boolean;
setSuperTrain54(value: boolean): void;
readonly superTrain61: boolean;
setSuperTrain61(value: boolean): void;
readonly superTrain62: boolean;
setSuperTrain62(value: boolean): void;
readonly superTrain63: boolean;
setSuperTrain63(value: boolean): void;
readonly superTrain71: boolean;
setSuperTrain71(value: boolean): void;
readonly superTrain72: boolean;
setSuperTrain72(value: boolean): void;
readonly superTrain73: boolean;
setSuperTrain73(value: boolean): void;
readonly superTrain81: boolean;
setSuperTrain81(value: boolean): void;
readonly superTrainBitFlags: number;
setSuperTrainBitFlags(value: number): void;
readonly superTrainSupremelyTrained: boolean;
setSuperTrainSupremelyTrained(value: boolean): void;
readonly trainingBag: number;
setTrainingBag(value: number): void;
readonly trainingBagEffect: number;
setTrainingBagEffect(value: number): void;
readonly trainingBagHits: number;
setTrainingBagHits(value: number): void;
readonly unused0: boolean;
setUnused0(value: boolean): void;
readonly unused1: boolean;
setUnused1(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.PK7` (Gen7).
 * Kind: class.
 */
export interface PK7 extends PKM {
readonly consoleRegion: number;
setConsoleRegion(value: number): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
readonly country: number;
setCountry(value: number): void;
readonly dirtLocation: number;
setDirtLocation(value: number): void;
readonly dirtType: number;
setDirtType(value: number): void;
readonly dist7: boolean;
setDist7(value: boolean): void;
readonly dist8: boolean;
setDist8(value: boolean): void;
readonly distSuperTrain1: boolean;
setDistSuperTrain1(value: boolean): void;
readonly distSuperTrain2: boolean;
setDistSuperTrain2(value: boolean): void;
readonly distSuperTrain3: boolean;
setDistSuperTrain3(value: boolean): void;
readonly distSuperTrain4: boolean;
setDistSuperTrain4(value: boolean): void;
readonly distSuperTrain5: boolean;
setDistSuperTrain5(value: boolean): void;
readonly distSuperTrain6: boolean;
setDistSuperTrain6(value: boolean): void;
readonly distTrainBitFlags: number;
setDistTrainBitFlags(value: number): void;
readonly enjoyment: number;
setEnjoyment(value: number): void;
fixMemories(): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly fullness: number;
setFullness(value: number): void;
readonly geo1Country: number;
setGeo1Country(value: number): void;
readonly geo1Region: number;
setGeo1Region(value: number): void;
readonly geo2Country: number;
setGeo2Country(value: number): void;
readonly geo2Region: number;
setGeo2Region(value: number): void;
readonly geo3Country: number;
setGeo3Country(value: number): void;
readonly geo3Region: number;
setGeo3Region(value: number): void;
readonly geo4Country: number;
setGeo4Country(value: number): void;
readonly geo4Region: number;
setGeo4Region(value: number): void;
readonly geo5Country: number;
setGeo5Country(value: number): void;
readonly geo5Region: number;
setGeo5Region(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerAffection: number;
setHandlingTrainerAffection(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly isUntradedEvent6: boolean;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly originalTrainerAffection: number;
setOriginalTrainerAffection(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib62: boolean;
setRib62(value: boolean): void;
readonly rib63: boolean;
setRib63(value: boolean): void;
readonly rib64: boolean;
setRib64(value: boolean): void;
readonly rib65: boolean;
setRib65(value: boolean): void;
readonly rib66: boolean;
setRib66(value: boolean): void;
readonly rib67: boolean;
setRib67(value: boolean): void;
readonly region: number;
setRegion(value: number): void;
readonly resortEventStatus: "NONE" | "SEIKAKU" | "CARE" | "LIKE_RESORT" | "LIKE_BATTLE" | "LIKE_ADV" | "GOOD_FRIEND" | "GIM" | "HOTSPA" | "WILD" | "WILD_LOVE" | "WILD_LIVE" | "POKEMAME_GET1" | "POKEMAME_GET2" | "POKEMAME_GET3" | "KINOMI_HELP" | "PLAY_STATE" | "HOTSPA_STATE" | "HOTSPA_DIZZY" | "HOTSPA_EGG_HATCHING" | "MAX";
setResortEventStatus(value: "NONE" | "SEIKAKU" | "CARE" | "LIKE_RESORT" | "LIKE_BATTLE" | "LIKE_ADV" | "GOOD_FRIEND" | "GIM" | "HOTSPA" | "WILD" | "WILD_LOVE" | "WILD_LIVE" | "POKEMAME_GET1" | "POKEMAME_GET2" | "POKEMAME_GET3" | "KINOMI_HELP" | "PLAY_STATE" | "HOTSPA_STATE" | "HOTSPA_DIZZY" | "HOTSPA_EGG_HATCHING" | "MAX"): void;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly secretSuperTrainingUnlocked: boolean;
setSecretSuperTrainingUnlocked(value: boolean): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
readonly superTrain1Atk: boolean;
setSuperTrain1Atk(value: boolean): void;
readonly superTrain1Def: boolean;
setSuperTrain1Def(value: boolean): void;
readonly superTrain1Hp: boolean;
setSuperTrain1Hp(value: boolean): void;
readonly superTrain1Spa: boolean;
setSuperTrain1Spa(value: boolean): void;
readonly superTrain1Spd: boolean;
setSuperTrain1Spd(value: boolean): void;
readonly superTrain1Spe: boolean;
setSuperTrain1Spe(value: boolean): void;
readonly superTrain2Atk: boolean;
setSuperTrain2Atk(value: boolean): void;
readonly superTrain2Def: boolean;
setSuperTrain2Def(value: boolean): void;
readonly superTrain2Hp: boolean;
setSuperTrain2Hp(value: boolean): void;
readonly superTrain2Spa: boolean;
setSuperTrain2Spa(value: boolean): void;
readonly superTrain2Spd: boolean;
setSuperTrain2Spd(value: boolean): void;
readonly superTrain2Spe: boolean;
setSuperTrain2Spe(value: boolean): void;
readonly superTrain3Atk: boolean;
setSuperTrain3Atk(value: boolean): void;
readonly superTrain3Def: boolean;
setSuperTrain3Def(value: boolean): void;
readonly superTrain3Hp: boolean;
setSuperTrain3Hp(value: boolean): void;
readonly superTrain3Spa: boolean;
setSuperTrain3Spa(value: boolean): void;
readonly superTrain3Spd: boolean;
setSuperTrain3Spd(value: boolean): void;
readonly superTrain3Spe: boolean;
setSuperTrain3Spe(value: boolean): void;
readonly superTrain41: boolean;
setSuperTrain41(value: boolean): void;
readonly superTrain51: boolean;
setSuperTrain51(value: boolean): void;
readonly superTrain52: boolean;
setSuperTrain52(value: boolean): void;
readonly superTrain53: boolean;
setSuperTrain53(value: boolean): void;
readonly superTrain54: boolean;
setSuperTrain54(value: boolean): void;
readonly superTrain61: boolean;
setSuperTrain61(value: boolean): void;
readonly superTrain62: boolean;
setSuperTrain62(value: boolean): void;
readonly superTrain63: boolean;
setSuperTrain63(value: boolean): void;
readonly superTrain71: boolean;
setSuperTrain71(value: boolean): void;
readonly superTrain72: boolean;
setSuperTrain72(value: boolean): void;
readonly superTrain73: boolean;
setSuperTrain73(value: boolean): void;
readonly superTrain81: boolean;
setSuperTrain81(value: boolean): void;
readonly superTrainBitFlags: number;
setSuperTrainBitFlags(value: number): void;
readonly superTrainSupremelyTrained: boolean;
setSuperTrainSupremelyTrained(value: boolean): void;
readonly unused0: boolean;
setUnused0(value: boolean): void;
readonly unused1: boolean;
setUnused1(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.PK8` (Gen8).
 * Kind: class.
 */
export interface PK8 extends PKM {
belongsTo(tr: ITrainerInfo): boolean;
readonly dynamaxType: number;
setDynamaxType(value: number): void;
fixMemories(): void;
readonly isSideTransfer: boolean;
updateHandler(tr: ITrainerInfo): void;
}

/**
 * Projected from `PKHeX.Core.PK9` (Gen9).
 * Kind: class.
 */
export interface PK9 extends PKM {
readonly affixedRibbon: number;
setAffixedRibbon(value: number): void;
readonly battleVersion: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setBattleVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
belongsTo(tr: ITrainerInfo): boolean;
belongsToSkipVersion(tr: ITrainerInfo): boolean;
readonly checksum: number;
setChecksum(value: number): void;
clearMoveRecordFlags(): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
fixMemories(): void;
fixRelearn(): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
getMoveRecordFlag(index: number): boolean;
getMoveRecordFlagAny(): boolean;
getRibbon(index: number): boolean;
getRibbonByte(index: number): number;
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerid: number;
setHandlingTrainerid(value: number): void;
readonly handlingTrainerLanguage: number;
setHandlingTrainerLanguage(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly hasBattleMemoryRibbon: boolean;
setHasBattleMemoryRibbon(value: boolean): void;
readonly hasContestMemoryRibbon: boolean;
setHasContestMemoryRibbon(value: boolean): void;
readonly hasMarkEncounter8: boolean;
readonly hasMarkEncounter9: boolean;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly iv32: number;
setIv32(value: number): void;
readonly isFavorite: boolean;
setIsFavorite(value: boolean): void;
readonly isUnhatchedEgg: boolean;
readonly markCount: number;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly obedienceLevel: number;
setObedienceLevel(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
readonly permit: IPermitRecord;
readonly pokerusState: number;
setPokerusState(value: number): void;
readonly rib457: boolean;
setRib457(value: boolean): void;
readonly rib460: boolean;
setRib460(value: boolean): void;
readonly rib461: boolean;
setRib461(value: boolean): void;
readonly rib462: boolean;
setRib462(value: boolean): void;
readonly rib463: boolean;
setRib463(value: boolean): void;
readonly rib464: boolean;
setRib464(value: boolean): void;
readonly rib465: boolean;
setRib465(value: boolean): void;
readonly rib466: boolean;
setRib466(value: boolean): void;
readonly rib467: boolean;
setRib467(value: boolean): void;
readonly rib470: boolean;
setRib470(value: boolean): void;
readonly rib471: boolean;
setRib471(value: boolean): void;
readonly rib472: boolean;
setRib472(value: boolean): void;
readonly rib473: boolean;
setRib473(value: boolean): void;
readonly rib474: boolean;
setRib474(value: boolean): void;
readonly rib475: boolean;
setRib475(value: boolean): void;
readonly rib476: boolean;
setRib476(value: boolean): void;
readonly rib477: boolean;
setRib477(value: boolean): void;
readonly recordFlagsBase: Uint8Array;
readonly recordFlagsdlc: Uint8Array;
readonly ribbonAlert: boolean;
setRibbonAlert(value: boolean): void;
readonly ribbonArtist: boolean;
setRibbonArtist(value: boolean): void;
readonly ribbonBattleRoyale: boolean;
setRibbonBattleRoyale(value: boolean): void;
readonly ribbonBattleTreeGreat: boolean;
setRibbonBattleTreeGreat(value: boolean): void;
readonly ribbonBattleTreeMaster: boolean;
setRibbonBattleTreeMaster(value: boolean): void;
readonly ribbonBattlerExpert: boolean;
setRibbonBattlerExpert(value: boolean): void;
readonly ribbonBattlerSkillful: boolean;
setRibbonBattlerSkillful(value: boolean): void;
readonly ribbonBestFriends: boolean;
setRibbonBestFriends(value: boolean): void;
readonly ribbonBirthday: boolean;
setRibbonBirthday(value: boolean): void;
readonly ribbonCareless: boolean;
setRibbonCareless(value: boolean): void;
readonly ribbonChampionAlola: boolean;
setRibbonChampionAlola(value: boolean): void;
readonly ribbonChampionBattle: boolean;
setRibbonChampionBattle(value: boolean): void;
readonly ribbonChampiong3: boolean;
setRibbonChampiong3(value: boolean): void;
readonly ribbonChampiong6Hoenn: boolean;
setRibbonChampiong6Hoenn(value: boolean): void;
readonly ribbonChampionGalar: boolean;
setRibbonChampionGalar(value: boolean): void;
readonly ribbonChampionKalos: boolean;
setRibbonChampionKalos(value: boolean): void;
readonly ribbonChampionNational: boolean;
setRibbonChampionNational(value: boolean): void;
readonly ribbonChampionPaldea: boolean;
setRibbonChampionPaldea(value: boolean): void;
readonly ribbonChampionRegional: boolean;
setRibbonChampionRegional(value: boolean): void;
readonly ribbonChampionSinnoh: boolean;
setRibbonChampionSinnoh(value: boolean): void;
readonly ribbonChampionWorld: boolean;
setRibbonChampionWorld(value: boolean): void;
readonly ribbonClassic: boolean;
setRibbonClassic(value: boolean): void;
readonly ribbonContestStar: boolean;
setRibbonContestStar(value: boolean): void;
readonly ribbonCount: number;
readonly ribbonCountMemoryBattle: number;
setRibbonCountMemoryBattle(value: number): void;
readonly ribbonCountMemoryContest: number;
setRibbonCountMemoryContest(value: number): void;
readonly ribbonCountry: boolean;
setRibbonCountry(value: boolean): void;
readonly ribbonDowncast: boolean;
setRibbonDowncast(value: boolean): void;
readonly ribbonEarth: boolean;
setRibbonEarth(value: boolean): void;
readonly ribbonEffort: boolean;
setRibbonEffort(value: boolean): void;
readonly ribbonEvent: boolean;
setRibbonEvent(value: boolean): void;
readonly ribbonFootprint: boolean;
setRibbonFootprint(value: boolean): void;
readonly ribbonGorgeous: boolean;
setRibbonGorgeous(value: boolean): void;
readonly ribbonGorgeousRoyal: boolean;
setRibbonGorgeousRoyal(value: boolean): void;
readonly ribbonHisui: boolean;
setRibbonHisui(value: boolean): void;
readonly ribbonLegend: boolean;
setRibbonLegend(value: boolean): void;
readonly ribbonMarkAbsentMinded: boolean;
setRibbonMarkAbsentMinded(value: boolean): void;
readonly ribbonMarkAlpha: boolean;
setRibbonMarkAlpha(value: boolean): void;
readonly ribbonMarkAngry: boolean;
setRibbonMarkAngry(value: boolean): void;
readonly ribbonMarkBlizzard: boolean;
setRibbonMarkBlizzard(value: boolean): void;
readonly ribbonMarkCalmness: boolean;
setRibbonMarkCalmness(value: boolean): void;
readonly ribbonMarkCharismatic: boolean;
setRibbonMarkCharismatic(value: boolean): void;
readonly ribbonMarkCloudy: boolean;
setRibbonMarkCloudy(value: boolean): void;
readonly ribbonMarkCount: number;
readonly ribbonMarkCrafty: boolean;
setRibbonMarkCrafty(value: boolean): void;
readonly ribbonMarkCurry: boolean;
setRibbonMarkCurry(value: boolean): void;
readonly ribbonMarkDawn: boolean;
setRibbonMarkDawn(value: boolean): void;
readonly ribbonMarkDestiny: boolean;
setRibbonMarkDestiny(value: boolean): void;
readonly ribbonMarkDry: boolean;
setRibbonMarkDry(value: boolean): void;
readonly ribbonMarkDusk: boolean;
setRibbonMarkDusk(value: boolean): void;
readonly ribbonMarkExcited: boolean;
setRibbonMarkExcited(value: boolean): void;
readonly ribbonMarkFerocious: boolean;
setRibbonMarkFerocious(value: boolean): void;
readonly ribbonMarkFishing: boolean;
setRibbonMarkFishing(value: boolean): void;
readonly ribbonMarkFlustered: boolean;
setRibbonMarkFlustered(value: boolean): void;
readonly ribbonMarkGourmand: boolean;
setRibbonMarkGourmand(value: boolean): void;
readonly ribbonMarkHumble: boolean;
setRibbonMarkHumble(value: boolean): void;
readonly ribbonMarkIntellectual: boolean;
setRibbonMarkIntellectual(value: boolean): void;
readonly ribbonMarkIntense: boolean;
setRibbonMarkIntense(value: boolean): void;
readonly ribbonMarkItemfinder: boolean;
setRibbonMarkItemfinder(value: boolean): void;
readonly ribbonMarkJittery: boolean;
setRibbonMarkJittery(value: boolean): void;
readonly ribbonMarkJoyful: boolean;
setRibbonMarkJoyful(value: boolean): void;
readonly ribbonMarkJumbo: boolean;
setRibbonMarkJumbo(value: boolean): void;
readonly ribbonMarkKindly: boolean;
setRibbonMarkKindly(value: boolean): void;
readonly ribbonMarkLunchtime: boolean;
setRibbonMarkLunchtime(value: boolean): void;
readonly ribbonMarkMightiest: boolean;
setRibbonMarkMightiest(value: boolean): void;
readonly ribbonMarkMini: boolean;
setRibbonMarkMini(value: boolean): void;
readonly ribbonMarkMisty: boolean;
setRibbonMarkMisty(value: boolean): void;
readonly ribbonMarkPartner: boolean;
setRibbonMarkPartner(value: boolean): void;
readonly ribbonMarkPeeved: boolean;
setRibbonMarkPeeved(value: boolean): void;
readonly ribbonMarkPrideful: boolean;
setRibbonMarkPrideful(value: boolean): void;
readonly ribbonMarkPumpedUp: boolean;
setRibbonMarkPumpedUp(value: boolean): void;
readonly ribbonMarkRainy: boolean;
setRibbonMarkRainy(value: boolean): void;
readonly ribbonMarkRare: boolean;
setRibbonMarkRare(value: boolean): void;
readonly ribbonMarkRowdy: boolean;
setRibbonMarkRowdy(value: boolean): void;
readonly ribbonMarkSandstorm: boolean;
setRibbonMarkSandstorm(value: boolean): void;
readonly ribbonMarkScowling: boolean;
setRibbonMarkScowling(value: boolean): void;
readonly ribbonMarkSleepyTime: boolean;
setRibbonMarkSleepyTime(value: boolean): void;
readonly ribbonMarkSlump: boolean;
setRibbonMarkSlump(value: boolean): void;
readonly ribbonMarkSmiley: boolean;
setRibbonMarkSmiley(value: boolean): void;
readonly ribbonMarkSnowy: boolean;
setRibbonMarkSnowy(value: boolean): void;
readonly ribbonMarkStormy: boolean;
setRibbonMarkStormy(value: boolean): void;
readonly ribbonMarkTeary: boolean;
setRibbonMarkTeary(value: boolean): void;
readonly ribbonMarkThorny: boolean;
setRibbonMarkThorny(value: boolean): void;
readonly ribbonMarkTitan: boolean;
setRibbonMarkTitan(value: boolean): void;
readonly ribbonMarkUncommon: boolean;
setRibbonMarkUncommon(value: boolean): void;
readonly ribbonMarkUnsure: boolean;
setRibbonMarkUnsure(value: boolean): void;
readonly ribbonMarkUpbeat: boolean;
setRibbonMarkUpbeat(value: boolean): void;
readonly ribbonMarkVigor: boolean;
setRibbonMarkVigor(value: boolean): void;
readonly ribbonMarkZeroEnergy: boolean;
setRibbonMarkZeroEnergy(value: boolean): void;
readonly ribbonMarkZonedOut: boolean;
setRibbonMarkZonedOut(value: boolean): void;
readonly ribbonMasterBeauty: boolean;
setRibbonMasterBeauty(value: boolean): void;
readonly ribbonMasterCleverness: boolean;
setRibbonMasterCleverness(value: boolean): void;
readonly ribbonMasterCoolness: boolean;
setRibbonMasterCoolness(value: boolean): void;
readonly ribbonMasterCuteness: boolean;
setRibbonMasterCuteness(value: boolean): void;
readonly ribbonMasterRank: boolean;
setRibbonMasterRank(value: boolean): void;
readonly ribbonMasterToughness: boolean;
setRibbonMasterToughness(value: boolean): void;
readonly ribbonNational: boolean;
setRibbonNational(value: boolean): void;
readonly ribbonOnceInAlifetime: boolean;
setRibbonOnceInAlifetime(value: boolean): void;
readonly ribbonPartner: boolean;
setRibbonPartner(value: boolean): void;
readonly ribbonPremier: boolean;
setRibbonPremier(value: boolean): void;
readonly ribbonRecord: boolean;
setRibbonRecord(value: boolean): void;
readonly ribbonRelax: boolean;
setRibbonRelax(value: boolean): void;
readonly ribbonRoyal: boolean;
setRibbonRoyal(value: boolean): void;
readonly ribbonShock: boolean;
setRibbonShock(value: boolean): void;
readonly ribbonSmile: boolean;
setRibbonSmile(value: boolean): void;
readonly ribbonSnooze: boolean;
setRibbonSnooze(value: boolean): void;
readonly ribbonSouvenir: boolean;
setRibbonSouvenir(value: boolean): void;
readonly ribbonSpecial: boolean;
setRibbonSpecial(value: boolean): void;
readonly ribbonTowerMaster: boolean;
setRibbonTowerMaster(value: boolean): void;
readonly ribbonTraining: boolean;
setRibbonTraining(value: boolean): void;
readonly ribbonTwinklingStar: boolean;
setRibbonTwinklingStar(value: boolean): void;
readonly ribbonWishing: boolean;
setRibbonWishing(value: boolean): void;
readonly ribbonWorld: boolean;
setRibbonWorld(value: boolean): void;
readonly sanity: number;
setSanity(value: number): void;
readonly scale: number;
setScale(value: number): void;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
setMoveRecordFlag(index: number, value: boolean): void;
setRibbon(index: number, value: boolean): void;
readonly speciesInternal: number;
setSpeciesInternal(value: number): void;
readonly teraType: "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy";
readonly teraTypeOriginal: "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy";
setTeraTypeOriginal(value: "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy"): void;
readonly teraTypeOverride: "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy";
setTeraTypeOverride(value: "Any" | "Normal" | "Fighting" | "Flying" | "Poison" | "Ground" | "Rock" | "Bug" | "Ghost" | "Steel" | "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Ice" | "Dragon" | "Dark" | "Fairy"): void;
readonly tracker: bigint;
setTracker(value: bigint): void;
updateHandler(tr: ITrainerInfo): void;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

/**
 * Projected from `PKHeX.Core.PKH`.
 * Kind: class.
 */
export interface PKH extends PKM {
readonly affixedRibbon: number;
setAffixedRibbon(value: number): void;
readonly battleVersion: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setBattleVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
readonly checksum: number;
setChecksum(value: number): void;
readonly contestBeauty: number;
setContestBeauty(value: number): void;
readonly contestCool: number;
setContestCool(value: number): void;
readonly contestCute: number;
setContestCute(value: number): void;
readonly contestSheen: number;
setContestSheen(value: number): void;
readonly contestSmart: number;
setContestSmart(value: number): void;
readonly contestTough: number;
setContestTough(value: number): void;
convertTopa8(): PA8;
convertTopa9(): PA9;
convertTopb7(): PB7;
convertTopb8(): PB8;
convertTopk8(): PK8;
convertTopk9(): PK9;
convertTopkm(type: "None" | "PB7" | "PK8" | "PA8" | "PB8" | "PK9" | "PC9" | "PA9"): PKM;
copyFrom(pk: PKM): void;
copyTo(pk: PKM): void;
readonly core: GameDataCore;
setCore(value: GameDataCore): void;
readonly coreDataSize: number;
setCoreDataSize(value: number): void;
readonly datapa8: GameDataPA8;
setDatapa8(value: GameDataPA8): void;
readonly datapa9: GameDataPA9;
setDatapa9(value: GameDataPA9): void;
readonly datapb7: GameDataPB7;
setDatapb7(value: GameDataPB7): void;
readonly datapb8: GameDataPB8;
setDatapb8(value: GameDataPB8): void;
readonly datapc9: GameDataPC9;
setDatapc9(value: GameDataPC9): void;
readonly datapk8: GameDataPK8;
setDatapk8(value: GameDataPK8): void;
readonly datapk9: GameDataPK9;
setDatapk9(value: GameDataPK9): void;
readonly dataVersion: number;
setDataVersion(value: number): void;
readonly encodedDataSize: number;
setEncodedDataSize(value: number): void;
readonly encryptionSeed: bigint;
setEncryptionSeed(value: bigint): void;
readonly favorite: boolean;
setFavorite(value: boolean): void;
readonly formArgument: number;
setFormArgument(value: number): void;
readonly formArgumentElapsed: number;
setFormArgumentElapsed(value: number): void;
readonly formArgumentMaximum: number;
setFormArgumentMaximum(value: number): void;
readonly formArgumentRemain: number;
setFormArgumentRemain(value: number): void;
readonly gameDataSize: number;
setGameDataSize(value: number): void;
getMarking(index: number): "None" | "Blue" | "Pink";
readonly htAtk: boolean;
setHtAtk(value: boolean): void;
readonly htDef: boolean;
setHtDef(value: boolean): void;
readonly htHp: boolean;
setHtHp(value: boolean): void;
readonly htSpa: boolean;
setHtSpa(value: boolean): void;
readonly htSpd: boolean;
setHtSpd(value: boolean): void;
readonly htSpe: boolean;
setHtSpe(value: boolean): void;
readonly handlingTrainerid: number;
setHandlingTrainerid(value: number): void;
readonly handlingTrainerLanguage: number;
setHandlingTrainerLanguage(value: number): void;
readonly handlingTrainerMemory: number;
setHandlingTrainerMemory(value: number): void;
readonly handlingTrainerMemoryFeeling: number;
setHandlingTrainerMemoryFeeling(value: number): void;
readonly handlingTrainerMemoryIntensity: number;
setHandlingTrainerMemoryIntensity(value: number): void;
readonly handlingTrainerMemoryVariable: number;
setHandlingTrainerMemoryVariable(value: number): void;
readonly heightScalar: number;
setHeightScalar(value: number): void;
readonly hyperTrainFlags: number;
setHyperTrainFlags(value: number): void;
readonly isBadEgg: boolean;
setIsBadEgg(value: boolean): void;
readonly latestGameData: IGameDataSide;
readonly markCount: number;
readonly markingCircle: "None" | "Blue" | "Pink";
setMarkingCircle(value: "None" | "Blue" | "Pink"): void;
readonly markingCount: number;
readonly markingDiamond: "None" | "Blue" | "Pink";
setMarkingDiamond(value: "None" | "Blue" | "Pink"): void;
readonly markingHeart: "None" | "Blue" | "Pink";
setMarkingHeart(value: "None" | "Blue" | "Pink"): void;
readonly markingSquare: "None" | "Blue" | "Pink";
setMarkingSquare(value: "None" | "Blue" | "Pink"): void;
readonly markingStar: "None" | "Blue" | "Pink";
setMarkingStar(value: "None" | "Blue" | "Pink"): void;
readonly markingTriangle: "None" | "Blue" | "Pink";
setMarkingTriangle(value: "None" | "Blue" | "Pink"): void;
readonly markingValue: number;
setMarkingValue(value: number): void;
readonly originalTrainerMemory: number;
setOriginalTrainerMemory(value: number): void;
readonly originalTrainerMemoryFeeling: number;
setOriginalTrainerMemoryFeeling(value: number): void;
readonly originalTrainerMemoryIntensity: number;
setOriginalTrainerMemoryIntensity(value: number): void;
readonly originalTrainerMemoryVariable: number;
setOriginalTrainerMemoryVariable(value: number): void;
rebuild(dest: Uint8Array): number;
rebuild(): Uint8Array;
readonly ribbonCount: number;
readonly ribbonMarkCount: number;
setMarking(index: number, value: "None" | "Blue" | "Pink"): void;
readonly tracker: bigint;
setTracker(value: bigint): void;
readonly weightScalar: number;
setWeightScalar(value: number): void;
}

export declare namespace PKH {
function convertFrompkm(pk: PKM): PKH;
function getPaddedSize(innerLength: number, remainder: number): number;
function updateHandler(pk: T, tr: ITrainerInfo): void;
}

/**
 * Projected from `PKHeX.Core.PKM`.
 * Kind: abstract.
 */
export interface PKM {
readonly ao: boolean;
readonly ability: number;
setAbility(value: number): void;
readonly abilityNumber: number;
setAbilityNumber(value: number): void;
addMove(move: number, pushOut: boolean): boolean;
readonly b2w2: boolean;
readonly bdsp: boolean;
readonly bw: boolean;
readonly ball: number;
setBall(value: number): void;
canHoldItem(valid: readonly number[]): boolean;
readonly characteristic: number;
/** Indicates if the data has a proper checksum. */
readonly checksumValid: boolean;
/** Clears moves that a  may have, possibly from a future generation. */
clearInvalidMoves(): void;
/** Deep clones the  object. The clone will not have any shared resources with the source. */
clone(): PKM;
readonly context: "None" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen8" | "Gen9" | "SplitInvalid" | "Gen7b" | "Gen8a" | "Gen8b" | "Gen9a" | "MaxInvalid";
readonly currentFriendship: number;
setCurrentFriendship(value: number): void;
readonly currentHandler: number;
setCurrentHandler(value: number): void;
readonly currentLevel: number;
readonly data: Uint8Array;
readonly displaysid: number;
setDisplaysid(value: number): void;
readonly displaytid: number;
setDisplaytid(value: number): void;
readonly e: boolean;
readonly evTotal: number;
readonly evAtk: number;
setEvAtk(value: number): void;
readonly evDef: number;
setEvDef(value: number): void;
readonly evHp: number;
setEvHp(value: number): void;
readonly evSpa: number;
setEvSpa(value: number): void;
readonly evSpd: number;
setEvSpd(value: number): void;
readonly evSpe: number;
setEvSpe(value: number): void;
readonly exp: number;
setExp(value: number): void;
readonly eggDay: number;
setEggDay(value: number): void;
readonly eggLocation: number;
setEggLocation(value: number): void;
/** The date a Pokémon was met as an egg. */
readonly eggMetDate: string | null;
setEggMetDate(value: string | null): void;
readonly eggMonth: number;
setEggMonth(value: number): void;
readonly eggYear: number;
setEggYear(value: number): void;
readonly encryptionConstant: number;
setEncryptionConstant(value: number): void;
equalsStored(pk: PKM): boolean;
readonly extension: string;
/** Bytes in the data structure that are unused, either as alignment padding, or were reserved and never used. */
readonly extraBytes: readonly number[];
readonly frlg: boolean;
readonly fatefulEncounter: boolean;
setFatefulEncounter(value: boolean): void;
readonly fileName: string;
readonly fileNameWithoutExtension: string;
/** Reorders moves and fixes PP if necessary. */
fixMoves(): void;
readonly flawlessivCount: number;
/** Enforces that Party Stat values are present. */
forcePartyData(): boolean;
readonly form: number;
setForm(value: number): void;
readonly format: number;
readonly gg: boolean;
readonly go: boolean;
readonly goHome: boolean;
readonly goLgpe: boolean;
readonly gen1: boolean;
readonly gen2: boolean;
readonly gen3: boolean;
readonly gen4: boolean;
readonly gen5: boolean;
readonly gen6: boolean;
readonly gen7: boolean;
readonly gen8: boolean;
readonly gen9: boolean;
readonly genu: boolean;
readonly gender: number;
setGender(value: number): void;
readonly generation: number;
getBasepp(move: number): number;
getBytesPerChar(): number;
getev(index: number): number;
getEvs(value: readonly number[]): void;
getiv(index: number): number;
getIvs(value: readonly number[]): void;
getIvs(): number;
getMove(index: number): number;
getMoveIndex(move: number): number;
getMovepp(move: number, ppUpCount: number): number;
getMoves(value: readonly number[]): void;
getRelearnMove(index: number): number;
getRelearnMoves(value: readonly number[]): void;
getStats(p: IBaseStat): readonly number[];
getString(data: Uint8Array): string;
getStringLength(data: Uint8Array): number;
getStringTerminatorIndex(data: Uint8Array): number;
readonly hgss: boolean;
readonly hpPower: number;
readonly hpType: number;
setHpType(value: number): void;
readonly handlingTrainerFriendship: number;
setHandlingTrainerFriendship(value: number): void;
readonly handlingTrainerGender: number;
setHandlingTrainerGender(value: number): void;
readonly handlingTrainerName: string;
setHandlingTrainerName(value: string): void;
readonly handlingTrainerTrash: Uint8Array;
hasMove(move: number): boolean;
/** Checks if the PKM has its original met location. */
readonly hasOriginalMetLocation: boolean;
hasRelearnMove(move: number): boolean;
heal(): void;
/** Restores PP to maximum based on the current PP Ups for each move. */
healpp(): void;
healppIndex(index: number): number;
readonly heldItem: number;
setHeldItem(value: number): void;
readonly id32: number;
setId32(value: number): void;
readonly ivTotal: number;
readonly ivAtk: number;
setIvAtk(value: number): void;
readonly ivDef: number;
setIvDef(value: number): void;
readonly ivHp: number;
setIvHp(value: number): void;
readonly ivSpa: number;
setIvSpa(value: number): void;
readonly ivSpd: number;
setIvSpd(value: number): void;
readonly ivSpe: number;
setIvSpe(value: number): void;
readonly ivs: readonly number[];
setIvs(value: readonly number[]): void;
readonly isEgg: boolean;
setIsEgg(value: boolean): void;
/** Checks if the current  is valid. */
isGenderValid(): boolean;
readonly isNicknamed: boolean;
setIsNicknamed(value: boolean): void;
readonly isOriginValid: boolean;
readonly isPokerusCured: boolean;
setIsPokerusCured(value: boolean): void;
readonly isPokerusInfected: boolean;
setIsPokerusInfected(value: boolean): void;
readonly isShiny: boolean;
readonly isTradedEgg: boolean;
readonly isUntraded: boolean;
readonly japanese: boolean;
readonly korean: boolean;
readonly la: boolean;
readonly lgpe: boolean;
readonly language: number;
setLanguage(value: number): void;
loadStats(p: IBaseStat, stats: readonly number[]): void;
loadString(data: Uint8Array, text: readonly string[]): number;
readonly maxAbilityid: number;
readonly maxBallid: number;
readonly maxev: number;
readonly maxGameid: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
readonly maxiv: number;
readonly maxItemid: number;
readonly maxMoveid: number;
readonly maxSpeciesid: number;
/** Maximum length a Nickname can be represented as. */
readonly maxStringLengthNickname: number;
/** Maximum length a Trainer Name can be represented as. */
readonly maxStringLengthTrainer: number;
readonly maximumiv: number;
/** The date the Pokémon was met. */
readonly metDate: string | null;
setMetDate(value: string | null): void;
readonly metDay: number;
setMetDay(value: number): void;
readonly metLevel: number;
setMetLevel(value: number): void;
readonly metLocation: number;
setMetLocation(value: number): void;
readonly metMonth: number;
setMetMonth(value: number): void;
readonly metYear: number;
setMetYear(value: number): void;
readonly minGameid: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
readonly move1: number;
setMove1(value: number): void;
readonly move1Pp: number;
setMove1Pp(value: number): void;
readonly move1PpUps: number;
setMove1PpUps(value: number): void;
readonly move2: number;
setMove2(value: number): void;
readonly move2Pp: number;
setMove2Pp(value: number): void;
readonly move2PpUps: number;
setMove2PpUps(value: number): void;
readonly move3: number;
setMove3(value: number): void;
readonly move3Pp: number;
setMove3Pp(value: number): void;
readonly move3PpUps: number;
setMove3PpUps(value: number): void;
readonly move4: number;
setMove4(value: number): void;
readonly move4Pp: number;
setMove4Pp(value: number): void;
readonly move4PpUps: number;
setMove4PpUps(value: number): void;
/** Count of non-zero moves in the moveset. */
readonly moveCount: number;
readonly moves: readonly number[];
setMoves(value: readonly number[]): void;
readonly nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random";
setNature(value: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random"): void;
readonly nickname: string;
setNickname(value: string): void;
readonly nicknameTrash: Uint8Array;
readonly originalTrainerFriendship: number;
setOriginalTrainerFriendship(value: number): void;
readonly originalTrainerGender: number;
setOriginalTrainerGender(value: number): void;
readonly originalTrainerName: string;
setOriginalTrainerName(value: string): void;
readonly originalTrainerTrash: Uint8Array;
readonly pid: number;
setPid(value: number): void;
readonly pidAbility: number;
readonly psv: number;
/** Indicates if Party Stats are present. False if not initialized (from stored format). */
readonly partyStatsPresent: boolean;
readonly personalInfo: PersonalInfo;
readonly pokerusDays: number;
setPokerusDays(value: number): void;
readonly pokerusStrain: number;
setPokerusStrain(value: number): void;
/** Gets the IV Judge Rating value. */
readonly potentialRating: number;
/** Conditions the  data to safely terminate the Nickname string from the text entry screen. */
prepareNickname(): void;
readonly pt: boolean;
refreshAbility(n: number): void;
/** Updates the checksum of the . */
refreshChecksum(): void;
readonly relearnMove1: number;
setRelearnMove1(value: number): void;
readonly relearnMove2: number;
setRelearnMove2(value: number): void;
readonly relearnMove3: number;
setRelearnMove3(value: number): void;
readonly relearnMove4: number;
setRelearnMove4(value: number): void;
readonly relearnMoves: readonly number[];
setRelearnMoves(value: readonly number[]): void;
/** Clears any status condition and refreshes the stats. */
resetPartyStats(): void;
readonly sid16: number;
setSid16(value: number): void;
readonly sizeParty: number;
readonly sizeStored: number;
readonly sm: boolean;
readonly sv: boolean;
readonly swsh: boolean;
setEvs(value: readonly number[]): void;
setIvs(value: readonly number[]): void;
setIvs(iv32: number): void;
setMove(index: number, value: number): number;
setMoves(value: readonly number[]): void;
setpidGender(gender: number): void;
setpidNature(nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random"): void;
setpidUnown3(form: number): void;
setRandomIvs(ivs: readonly number[], minFlawless: number): void;
setRandomIvs(ivs: readonly number[], template: IndividualValueSet): void;
setRandomIvs(template: IndividualValueSet): void;
setRandomIvs(minFlawless: number): void;
setRandomIvsgo(ivs: readonly number[], minIV: number, maxIV: number): void;
setRandomIvsgo(minIV: number, maxIV: number): void;
setRelearnMove(index: number, value: number): number;
setRelearnMoves(value: readonly number[]): void;
/** Applies a shiny  to the . */
setShiny(): void;
setShinysid(shiny: "Random" | "Never" | "Always" | "AlwaysStar" | "AlwaysSquare" | "FixedValue"): void;
setStats(stats: readonly number[]): void;
setString(data: Uint8Array, text: readonly string[], length: number, option: "None" | "ClearZero" | "Clear50" | "Clear7F" | "ClearFF" | "ClearZeroSafeTerminate"): number;
readonly shinyXor: number;
readonly species: number;
setSpecies(value: number): void;
readonly spriteItem: number;
readonly statAlignment: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random";
setStatAlignment(value: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random"): void;
readonly statAtk: number;
setStatAtk(value: number): void;
readonly statDef: number;
setStatDef(value: number): void;
readonly statHpCurrent: number;
setStatHpCurrent(value: number): void;
readonly statHpMax: number;
setStatHpMax(value: number): void;
readonly statLevel: number;
setStatLevel(value: number): void;
readonly statSpa: number;
setStatSpa(value: number): void;
readonly statSpd: number;
setStatSpd(value: number): void;
readonly statSpe: number;
setStatSpe(value: number): void;
readonly stats: readonly number[];
setStats(value: readonly number[]): void;
readonly statusCondition: number;
setStatusCondition(value: number): void;
readonly tid16: number;
setTid16(value: number): void;
readonly tsv: number;
readonly traineridDisplayFormat: "None" | "SixteenBitSingle" | "SixteenBit" | "SixDigit";
readonly trainersid7: number;
setTrainersid7(value: number): void;
readonly trainertid7: number;
setTrainertid7(value: number): void;
transferPropertiesWithReflection(result: PKM): void;
/** Total characters allocated for holding a Nickname. */
readonly trashCharCountNickname: number;
/** Total characters allocated for holding a Trainer Name. */
readonly trashCharCountTrainer: number;
readonly usum: boolean;
readonly vc: boolean;
readonly vc1: boolean;
readonly vc2: boolean;
/** Rough indication if the data is junk or not. */
readonly valid: boolean;
setValid(value: boolean): void;
readonly version: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
readonly wasEgg: boolean;
readonly wasTradedEgg: boolean;
writeDecryptedDataParty(stored: Uint8Array, party: Uint8Array): void;
writeDecryptedDataParty(destination: Uint8Array): void;
writeDecryptedDataStored(destination: Uint8Array): number;
writeEncryptedDataParty(stored: Uint8Array, party: Uint8Array): void;
writeEncryptedDataParty(destination: Uint8Array): void;
writeEncryptedDataStored(destination: Uint8Array): void;
readonly xy: boolean;
readonly za: boolean;
}

/**
 * Projected from `PKHeX.Core.PlayerBag`.
 * Kind: abstract.
 */
export interface PlayerBag {
clamp(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, requestVal: number): number;
copyTo(sav: SaveFile): void;
getMaxCount(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number): number;
getPouch(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones"): InventoryPouch;
readonly info: IItemStorage;
isLegal(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, itemCount: number): boolean;
isQuantitySane(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, count: number, hasNew: boolean, HaX: boolean): boolean;
readonly maxQuantityHax: number;
/** Gets the pouches represented by the bag. */
readonly pouches: readonly InventoryPouch[];
}

/**
 * Projected from `PKHeX.Core.PlayerBag1`.
 * Kind: class.
 */
export interface PlayerBag1 extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag2`.
 * Kind: class.
 */
export interface PlayerBag2 extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag3Colosseum`.
 * Kind: class.
 */
export interface PlayerBag3Colosseum extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag3E`.
 * Kind: class.
 */
export interface PlayerBag3E extends PlayerBag {
updateSecurityKey(securityKey: number): void;
}

/**
 * Projected from `PKHeX.Core.PlayerBag3FRLG`.
 * Kind: class.
 */
export interface PlayerBag3FRLG extends PlayerBag {
updateSecurityKey(securityKey: number): void;
}

/**
 * Projected from `PKHeX.Core.PlayerBag3RS`.
 * Kind: class.
 */
export interface PlayerBag3RS extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag3XD`.
 * Kind: class.
 */
export interface PlayerBag3XD extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag4DP`.
 * Kind: class.
 */
export interface PlayerBag4DP extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag4HGSS`.
 * Kind: class.
 */
export interface PlayerBag4HGSS extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag4Pt`.
 * Kind: class.
 */
export interface PlayerBag4Pt extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag5B2W2`.
 * Kind: class.
 */
export interface PlayerBag5B2W2 extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag5BW`.
 * Kind: class.
 */
export interface PlayerBag5BW extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag6AO`.
 * Kind: class.
 */
export interface PlayerBag6AO extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag6XY`.
 * Kind: class.
 */
export interface PlayerBag6XY extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag7SM`.
 * Kind: class.
 */
export interface PlayerBag7SM extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag7USUM`.
 * Kind: class.
 */
export interface PlayerBag7USUM extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag7b`.
 * Kind: class.
 */
export interface PlayerBag7b extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag8`.
 * Kind: class.
 */
export interface PlayerBag8 extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag8a`.
 * Kind: class.
 */
export interface PlayerBag8a extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag8b`.
 * Kind: class.
 */
export interface PlayerBag8b extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag9`.
 * Kind: class.
 */
export interface PlayerBag9 extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.PlayerBag9a`.
 * Kind: class.
 */
export interface PlayerBag9a extends PlayerBag {
}

/**
 * Projected from `PKHeX.Core.RK4` (Gen4).
 * Kind: class.
 */
export interface RK4 extends PKM {
convertTopk4(): PK4;
readonly handlingTrainerid32: number;
setHandlingTrainerid32(value: number): void;
readonly handlingTrainersid: number;
setHandlingTrainersid(value: number): void;
readonly handlingTrainertid: number;
setHandlingTrainertid(value: number): void;
readonly ownershipStatus: "None" | "Traded";
setOwnershipStatus(value: "None" | "Traded"): void;
readonly ownershipType: "None" | "Trainer" | "Hayley" | "Hayley_Traded";
setOwnershipType(value: "None" | "Trainer" | "Hayley" | "Hayley_Traded"): void;
}

/**
 * Projected from `PKHeX.Core.Records`.
 * Kind: static.
 */
export declare namespace Records {
const dailyPairs6: Uint8Array;
const dailyPairs7: Uint8Array;
/** Festa pairs; if updating the lower index record, update the Festa Mission record if currently active? */
const festaPairs7: Uint8Array;
function getMax(recordID: number, maxes: Uint8Array): number;
function getOffset(recordID: number): number;
}

/**
 * Projected from `PKHeX.Core.SAV1`.
 * Kind: class.
 */
export interface SAV1 extends SaveFile {
readonly badges: number;
setBadges(value: number): void;
readonly battleEffects: boolean;
setBattleEffects(value: boolean): void;
readonly battleStyleSwitch: boolean;
setBattleStyleSwitch(value: boolean): void;
readonly boxesInitialized: boolean;
setBoxesInitialized(value: boolean): void;
readonly coin: number;
setCoin(value: number): void;
readonly daycareSlotCount: number;
readonly eventFlagCount: number;
readonly eventSpawnFlags: readonly boolean[];
setEventSpawnFlags(value: readonly boolean[]): void;
readonly eventWorkCount: number;
readonly gbPrinterBrightness: number;
setGbPrinterBrightness(value: number): void;
getBoxName(box: number): string;
getDaycareSlot(index: number): Uint8Array;
getEventFlag(flagNumber: number): boolean;
getWork(index: number): number;
readonly hallOfFame: HallOfFameReader1;
readonly hallOfFameCount: number;
setHallOfFameCount(value: number): void;
isDaycareOccupied(index: number): boolean;
readonly isSilphLaprasReceived: boolean;
setIsSilphLaprasReceived(value: boolean): void;
readonly isVirtualConsole: boolean;
readonly japanese: boolean;
readonly korean: boolean;
readonly originalTrainerTrash: Uint8Array;
setOriginalTrainerTrash(value: Uint8Array): void;
readonly pikaBeachScore: number;
setPikaBeachScore(value: number): void;
readonly pikaFriendship: number;
setPikaFriendship(value: number): void;
readonly playedFrames: number;
setPlayedFrames(value: number): void;
readonly playedMaximum: boolean;
setPlayedMaximum(value: boolean): void;
readonly rivalName: string;
setRivalName(value: string): void;
readonly rivalNameTrash: Uint8Array;
setRivalNameTrash(value: Uint8Array): void;
readonly rivalStarter: number;
setRivalStarter(value: number): void;
readonly saveRevision: number;
readonly saveRevisionString: string;
setDaycareOccupied(index: number, occupied: boolean): void;
setEventFlag(flagNumber: number, value: boolean): void;
setWork(index: number, value: number): void;
readonly sound: number;
setSound(value: number): void;
readonly starter: number;
setStarter(value: number): void;
readonly textSpeed: number;
setTextSpeed(value: number): void;
readonly wramd72e: number;
}

export declare namespace SAV1 {
function isYellow(data: Uint8Array, japanese: boolean): boolean;
function isYellowint(data: Uint8Array): boolean;
function isYellowjpn(data: Uint8Array): boolean;
}

/**
 * Projected from `PKHeX.Core.SAV1Stadium`.
 * Kind: class.
 */
export interface SAV1Stadium extends SaveFile {
fixStoragePreWrite(): boolean;
getTeamName(team: number): string;
getTeamOffset(type: "Anything_Goes" | "Little_Cup" | "Poke_Cup" | "Prime_Cup" | "GymLeader_Castle" | "Vs_Rival", team: number): number;
getTeamOffset(team: number): number;
readonly isUsingBackupBoxSlots: boolean;
setIsUsingBackupBoxSlots(value: boolean): void;
}

export declare namespace SAV1Stadium {
function isHeaderValid(header: Uint8Array, footer: Uint8Array, japanese: boolean): boolean;
function isStadium(data: Uint8Array): boolean;
}

/**
 * Projected from `PKHeX.Core.SAV1StadiumJ`.
 * Kind: class.
 */
export interface SAV1StadiumJ extends SaveFile {
getTeamName(team: number): string;
}

export declare namespace SAV1StadiumJ {
function getTeamOffset(team: number): number;
function isStadium(data: Uint8Array): boolean;
}

/**
 * Projected from `PKHeX.Core.SAV2`.
 * Kind: class.
 */
export interface SAV2 extends SaveFile {
readonly badges: number;
setBadges(value: number): void;
readonly battleEffects: boolean;
setBattleEffects(value: boolean): void;
readonly battleStyleSwitch: boolean;
setBattleStyleSwitch(value: boolean): void;
readonly blueCardPoints: number;
setBlueCardPoints(value: number): void;
readonly coin: number;
setCoin(value: number): void;
daycareFlagByte(index: number): number;
readonly daycareSlotCount: number;
/** Triggered on Virtual Console by adding Hall of Fame entry, enabling the event. */
enablegsBallMobileEvent(): void;
readonly eventFlagCount: number;
readonly eventWorkCount: number;
readonly gbMobileCable: "None" | "Blue" | "Yellow" | "Green" | "Red" | "Purple" | "Black" | "Pink" | "Gray" | "Debug" | "Disabled";
setGbMobileCable(value: "None" | "Blue" | "Yellow" | "Green" | "Red" | "Purple" | "Black" | "Pink" | "Gray" | "Debug" | "Disabled"): void;
readonly gbPrinterBrightness: number;
setGbPrinterBrightness(value: number): void;
getBoxName(box: number): string;
getDaycareEgg(): Uint8Array;
getDaycareSlot(slot: number): Uint8Array;
getEventFlag(flagNumber: number): boolean;
getWork(index: number): number;
isDaycareOccupied(slot: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly isEnabledgsBallMobileEvent: boolean;
readonly isgbMobileAvailable: boolean;
readonly isgbMobileEnabled: boolean;
readonly isMysteryGiftUnlocked: boolean;
setIsMysteryGiftUnlocked(value: boolean): void;
readonly isVirtualConsole: boolean;
readonly japanese: boolean;
readonly korean: boolean;
readonly menuAccountOn: boolean;
setMenuAccountOn(value: boolean): void;
readonly mysteryGiftItem: number;
setMysteryGiftItem(value: number): void;
readonly originalTrainerTrash: Uint8Array;
setOriginalTrainerTrash(value: Uint8Array): void;
readonly palette: number;
setPalette(value: number): void;
readonly resetKey: number;
/** Sets the "Time Not Set" flag to the RTC Flag list. */
resetrtc(): void;
readonly rivalName: string;
setRivalName(value: string): void;
readonly rivalNameTrash: Uint8Array;
setRivalNameTrash(value: Uint8Array): void;
readonly saveFileExists: boolean;
setSaveFileExists(value: boolean): void;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
setEventFlag(flagNumber: number, value: boolean): void;
setWork(index: number, value: number): void;
readonly sound: number;
setSound(value: number): void;
readonly textBoxFlags: number;
setTextBoxFlags(value: number): void;
readonly textBoxFrame: number;
setTextBoxFrame(value: number): void;
readonly textBoxFrameDelay1: boolean;
setTextBoxFrameDelay1(value: boolean): void;
readonly textBoxFrameDelayNone: boolean;
setTextBoxFrameDelayNone(value: boolean): void;
readonly textSpeed: number;
setTextSpeed(value: number): void;
unlockAllDecorations(): void;
/** Chooses which Unown sprite to show in the regular Pokédex View */
readonly unownFirstSeen: number;
setUnownFirstSeen(value: number): void;
/** Unlocks all Unown letters/forms in the wild. */
unownUnlockAll(): void;
/** Toggles the availability of Unown letter groups in the Wild */
readonly unownUnlocked: number;
setUnownUnlocked(value: number): void;
/** Flag that determines if Unown Letters are available in the wild: A, B, C, D, E, F, G, H, I, J, K */
readonly unownUnlocked0: boolean;
setUnownUnlocked0(value: boolean): void;
/** Flag that determines if Unown Letters are available in the wild: L, M, N, O, P, Q, R */
readonly unownUnlocked1: boolean;
setUnownUnlocked1(value: boolean): void;
/** Flag that determines if Unown Letters are available in the wild: S, T, U, V, W */
readonly unownUnlocked2: boolean;
setUnownUnlocked2(value: boolean): void;
/** Flag that determines if Unown Letters are available in the wild: X, Y, Z */
readonly unownUnlocked3: boolean;
setUnownUnlocked3(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.SAV2Stadium`.
 * Kind: class.
 */
export interface SAV2Stadium extends SaveFile {
getBoxName(box: number): string;
getTeamName(team: number): string;
readonly mailboxBlockSize: number;
readonly mailboxHeldBlockSize: number;
setBoxName(box: number, name: readonly string[]): void;
}

export declare namespace SAV2Stadium {
function getTeamOffset(team: number): number;
function getTeamOffset(type: "Anything_Goes" | "Little_Cup" | "Poke_Cup" | "Prime_Cup" | "GymLeader_Castle" | "Vs_Rival", team: number): number;
function isStadium(data: Uint8Array): boolean;
function mailboxBlockOffset(language: number): number;
function mailboxHeldBlockOffset(language: number): number;
const mailboxHeldMailCount: number;
function setMailboxHeldMailCount(value: number): void;
const mailboxMailCount: number;
function setMailboxMailCount(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV3`.
 * Kind: abstract.
 */
export interface SAV3 extends SaveFile {
readonly badges: number;
setBadges(value: number): void;
readonly coin: number;
setCoin(value: number): void;
/** PokéCoupons stored by Pokémon Colosseum and XD from Mt. Battle runs. Earned PokéCoupons are also added to . */
readonly colosseumCoupons: number;
setColosseumCoupons(value: number): void;
/** Used by the JP Colosseum bonus disc. Determines PokéCoupon rank to distribute rewards. Unread in International games. */
readonly colosseumCouponsTotal: number;
setColosseumCouponsTotal(value: number): void;
/** PP Max from JP Colosseum Bonus Disc; for reaching 2500 */
readonly colosseumPokeCouponTitleBronze: boolean;
setColosseumPokeCouponTitleBronze(value: boolean): void;
/** Master Ball from JP Colosseum Bonus Disc; for reaching 30,000 */
readonly colosseumPokeCouponTitleGold: boolean;
setColosseumPokeCouponTitleGold(value: boolean): void;
/** Light Ball Pikachu from JP Colosseum Bonus Disc; for reaching 5000 */
readonly colosseumPokeCouponTitleSilver: boolean;
setColosseumPokeCouponTitleSilver(value: boolean): void;
readonly colosseumRaw1: number;
setColosseumRaw1(value: number): void;
readonly colosseumRaw2: number;
setColosseumRaw2(value: number): void;
/** Received Celebi Gift from JP Colosseum Bonus Disc */
readonly colosseumReceivedAgeto: boolean;
setColosseumReceivedAgeto(value: boolean): void;
readonly daycareSlotCount: number;
readonly eberryName: string;
readonly eventFlagCount: number;
readonly eventWorkCount: number;
forceLoad(version: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): SAV3;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getDaycareexp(index: number): number;
getDaycareSlot(slot: number): Uint8Array;
getDaycareSlotOffset(slot: number): number;
/** Only used by Japanese Emerald games. */
getEreaderData(): Uint8Array;
getEventFlag(flagNumber: number): boolean;
/** Only used in Emerald for storing the Battle Video. */
getFinalExternalData(): Uint8Array;
/** Hall of Fame data is split across two sectors. */
getHallOfFameData(): Uint8Array;
getRecord(record: number): number;
getWork(index: number): number;
readonly giftRibbons: Uint8Array;
giftRibbonsClear(): void;
giftRibbonsImport(trade: Uint8Array): void;
/** Received Jirachi Gift from Colosseum Bonus Disc */
readonly hasReceivedWishmkrJirachi: boolean;
setHasReceivedWishmkrJirachi(value: boolean): void;
/** Indicates if this save has connected to RSBOX and triggered the free False Swipe Swablu Egg giveaway. */
readonly hasUsedrsbox: boolean;
setHasUsedrsbox(value: boolean): void;
isCorruptPokedexff(): boolean;
isDaycareOccupied(slot: number): boolean;
readonly isEberryEngima: boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
/** Indicates if the extdata sections of the save file are available for get/set. */
readonly isFullSaveFile: boolean;
/** Indicates if the save file was a misconfigured (smaller) size, and thus not all extra blocks may be present. */
readonly isMisconfiguredSize: boolean;
readonly isVirtualConsole: boolean;
readonly japanese: boolean;
readonly korean: boolean;
readonly large: Uint8Array;
readonly largeBlock: ISaveBlock3Large;
readonly largeBuffer: Uint8Array;
setLargeBuffer(value: Uint8Array): void;
/** In Gen 3, the seen flags are stored in three different places. Mirror them to each other to ensure consistency. */
mirrorSeenFlags(): void;
readonly nationalDex: boolean;
setNationalDex(value: boolean): void;
/** 1 for ExtremeSpeed Zigzagoon (at 100 deposited), 2 for Pay Day Skitty (at 500 deposited), 3 for Surf Pichu (at 1499 deposited) */
readonly rsBoxDepositEggsUnlocked: number;
setRsBoxDepositEggsUnlocked(value: number): void;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setDaycareexp(index: number, value: number): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
setEventFlag(flagNumber: number, value: boolean): void;
setHallOfFameData(value: Uint8Array): void;
setRecord(record: number, value: number): void;
setWork(index: number, value: number): void;
readonly small: Uint8Array;
readonly smallBlock: ISaveBlock3Small;
readonly smallBuffer: Uint8Array;
setSmallBuffer(value: Uint8Array): void;
readonly storage: Uint8Array;
readonly storageBuffer: Uint8Array;
setStorageBuffer(value: Uint8Array): void;
writeBothSaveSlots(data: Uint8Array): void;
}

export declare namespace SAV3 {
function isAllMainSectorsPresent(data: Uint8Array, slot: number, sector0: number): boolean;
function isMail(itemID: number): boolean;
function isVirtualConsoleFileName(s: string): boolean;
const sizeSectorUsed: number;
function setSizeSectorUsed(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV3Colosseum`.
 * Kind: class.
 */
export interface SAV3Colosseum extends SaveFile {
readonly coupons: number;
setCoupons(value: number): void;
readonly couponsTotal: number;
setCouponsTotal(value: number): void;
readonly currentRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setCurrentRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly daycareDepositLevel: number;
setDaycareDepositLevel(value: number): void;
readonly daycareSlotCount: number;
readonly gcGameIndex: "None" | "FR" | "LG" | "S" | "R" | "E" | "CXD";
setGcGameIndex(value: "None" | "FR" | "LG" | "S" | "R" | "E" | "CXD"): void;
readonly gcLanguage: "Hacked" | "Japanese" | "English" | "German" | "French" | "Italian" | "Spanish" | "UNUSED_6";
setGcLanguage(value: "Hacked" | "Japanese" | "English" | "German" | "French" | "Italian" | "Spanish" | "UNUSED_6"): void;
getBoxName(box: number): string;
getDaycareexp(index: number): number;
getDaycareSlot(slot: number): Uint8Array;
isDaycareOccupied(slot: number): boolean;
readonly memoryCard: SAV3GCMemoryCard;
setMemoryCard(value: SAV3GCMemoryCard): void;
readonly ot2: string;
setOt2(value: string): void;
readonly originalRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setOriginalRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly originalTrainerTrash: Uint8Array;
/** Received PP Max from JP Colosseum Bonus Disc; for reaching 2,500 */
readonly pokeCouponTitleBronze: boolean;
setPokeCouponTitleBronze(value: boolean): void;
/** Received Master Ball from JP Colosseum Bonus Disc; for reaching 30,000 */
readonly pokeCouponTitleGold: boolean;
setPokeCouponTitleGold(value: boolean): void;
/** Received Light Ball Pikachu from JP Colosseum Bonus Disc; for reaching 5,000 */
readonly pokeCouponTitleSilver: boolean;
setPokeCouponTitleSilver(value: boolean): void;
readonly ruiName: string;
setRuiName(value: string): void;
/** Received Celebi Gift from JP Colosseum Bonus Disc */
readonly receivedAgeto: boolean;
setReceivedAgeto(value: boolean): void;
/** Used by the JP Colosseum Bonus Disc. Records how many Celebi have been sent to a GBA game. */
readonly receivedAgetogba: number;
setReceivedAgetogba(value: number): void;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setDaycareexp(index: number, value: number): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
}

export declare namespace SAV3Colosseum {
const maxShadowid: number;
function setMaxShadowid(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV3E`.
 * Kind: class.
 */
export interface SAV3E extends SaveFile {
readonly battleVideo: BattleVideo3;
setBattleVideo(value: BattleVideo3): void;
readonly battleVideoData: Uint8Array;
readonly hasBattleVideo: boolean;
setExtraDataSentinelBattleVideo(): void;
}

/**
 * Projected from `PKHeX.Core.SAV3FRLG`.
 * Kind: class.
 */
export interface SAV3FRLG extends SaveFile {
resetPersonal(g: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): boolean;
readonly rivalName: string;
setRivalName(value: string): void;
}

/**
 * Projected from `PKHeX.Core.SAV3RS`.
 * Kind: class.
 */
export interface SAV3RS extends SaveFile {
}

/**
 * Projected from `PKHeX.Core.SAV3RSBox`.
 * Kind: class.
 */
export interface SAV3RSBox extends SaveFile {
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
readonly memoryCard: SAV3GCMemoryCard;
setMemoryCard(value: SAV3GCMemoryCard): void;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
}

export declare namespace SAV3RSBox {
const boxNamePrefix: number;
function setBoxNamePrefix(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV3XD`.
 * Kind: class.
 */
export interface SAV3XD extends SaveFile {
readonly coupons: number;
setCoupons(value: number): void;
readonly currentRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setCurrentRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly daycareDepositLevel: number;
setDaycareDepositLevel(value: number): void;
readonly daycareSlotCount: number;
readonly gcGameIndex: "None" | "FR" | "LG" | "S" | "R" | "E" | "CXD";
setGcGameIndex(value: "None" | "FR" | "LG" | "S" | "R" | "E" | "CXD"): void;
readonly gcLanguage: "Hacked" | "Japanese" | "English" | "German" | "French" | "Italian" | "Spanish" | "UNUSED_6";
setGcLanguage(value: "Hacked" | "Japanese" | "English" | "German" | "French" | "Italian" | "Spanish" | "UNUSED_6"): void;
getBoxName(box: number): string;
getDaycareexp(index: number): number;
getDaycareSlot(slot: number): Uint8Array;
isDaycareOccupied(slot: number): boolean;
readonly maxShadowid: number;
readonly memoryCard: SAV3GCMemoryCard;
setMemoryCard(value: SAV3GCMemoryCard): void;
readonly ofsPouch: number;
setOfsPouch(value: number): void;
readonly originalRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setOriginalRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly originalTrainerTrash: Uint8Array;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setDaycareexp(index: number, value: number): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
}

/**
 * Projected from `PKHeX.Core.SAV4`.
 * Kind: abstract.
 */
export interface SAV4 extends SaveFile {
readonly bp: number;
setBp(value: number): void;
readonly badges: number;
setBadges(value: number): void;
readonly battleTowerSeed: number;
setBattleTowerSeed(value: number): void;
readonly chatter: Chatter4;
readonly coin: number;
setCoin(value: number): void;
readonly country: number;
setCountry(value: number): void;
readonly daycareSlotCount: number;
readonly daycareStepCounter: number;
setDaycareStepCounter(value: number): void;
readonly dex: Zukan4;
readonly dexUpgraded: number;
setDexUpgraded(value: number): void;
readonly eventFlagCount: number;
readonly eventWorkCount: number;
readonly gts: number;
setGts(value: number): void;
readonly gameClear: boolean;
setGameClear(value: boolean): void;
readonly general: Uint8Array;
readonly geonet: number;
setGeonet(value: number): void;
readonly geonetGlobalFlag: boolean;
setGeonetGlobalFlag(value: boolean): void;
getAccessoryOwnedCount(accessory: "WhiteFluff" | "YellowFluff" | "PinkFluff" | "BrownFluff" | "BlackFluff" | "OrangeFluff" | "RoundPebble" | "GlitterBoulder" | "SnaggyPebble" | "JaggedBoulder" | "BlackPebble" | "MiniPebble" | "PinkScale" | "BlueScale" | "GreenScale" | "PurpleScale" | "BigScale" | "NarrowScale" | "BlueFeather" | "RedFeather" | "YellowFeather" | "WhiteFeather" | "BlackMoustache" | "WhiteMoustache" | "BlackBeard" | "WhiteBeard" | "SmallLeaf" | "BigLeaf" | "NarrowLeaf" | "ShedClaw" | "ShedHorn" | "ThinMushroom" | "ThickMushroom" | "Stump" | "PrettyDewdrop" | "SnowCrystal" | "Sparks" | "ShimmeringFire" | "MysticFire" | "Determination" | "PeculiarSpoon" | "PuffySmoke" | "PoisonExtract" | "WealthyCoin" | "EerieThing" | "Spring" | "Seashell" | "HummingNote" | "ShinyPowder" | "GlitterPowder" | "RedFlower" | "PinkFlower" | "WhiteFlower" | "BlueFlower" | "OrangeFlower" | "YellowFlower" | "GooglySpecs" | "BlackSpecs" | "GorgeousSpecs" | "SweetCandy" | "Confetti" | "ColoredParasol" | "OldUmbrella" | "Spotlight" | "Cape" | "StandingMike" | "Surfboard" | "Carpet" | "RetroPipe" | "FluffyBed" | "MirrorBall" | "PhotoBoard" | "PinkBarrette" | "RedBarrette" | "BlueBarrette" | "YellowBarrette" | "GreenBarrette" | "PinkBalloon" | "RedBalloons" | "BlueBalloons" | "YellowBalloon" | "GreenBalloons" | "LaceHeadress" | "TopHat" | "SilkVeil" | "HeroicHeadband" | "ProfessorHat" | "FlowerStage" | "GoldPedestal" | "GlassStage" | "AwardPodium" | "CubeStage" | "TURTWIGMask" | "CHIMCHARMask" | "PIPLUPMask" | "BigTree" | "Flag" | "Crown" | "Tiara" | "Comet"): number;
getBackdropPosition(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset"): number;
getBackdropUnlocked(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset"): boolean;
getBattleVideo(index: number): BattleVideo4;
getDaycareexp(index: number): number;
getDaycareSlot(slot: number): Uint8Array;
getEventFlag(flagNumber: number): boolean;
getHall(): Hall4;
getMail(mailIndex: number): Mail4;
getMailData(ofs: number): Uint8Array;
getMailOffset(index: number): number;
getSealCase(): Uint8Array;
getSealCount(id: "HeartA" | "HeartB" | "HeartC" | "HeartD" | "HeartE" | "HeartF" | "StarA" | "StarB" | "StarC" | "StarD" | "StarE" | "StarF" | "LineA" | "LineB" | "LineC" | "LineD" | "SmokeA" | "SmokeB" | "SmokeC" | "SmokeD" | "ElectricA" | "ElectricB" | "ElectricC" | "ElectricD" | "FoamyA" | "FoamyB" | "FoamyC" | "FoamyD" | "FireA" | "FireB" | "FireC" | "FireD" | "PartyA" | "PartyB" | "PartyC" | "PartyD" | "FloraA" | "FloraB" | "FloraC" | "FloraD" | "FloraE" | "FloraF" | "SongA" | "SongB" | "SongC" | "SongD" | "SongE" | "SongF" | "SongG" | "LetterA" | "LetterB" | "LetterC" | "LetterD" | "LetterE" | "LetterF" | "LetterG" | "LetterH" | "LetterI" | "LetterJ" | "LetterK" | "LetterL" | "LetterM" | "LetterN" | "LetterO" | "LetterP" | "LetterQ" | "LetterR" | "LetterS" | "LetterT" | "LetterU" | "LetterV" | "LetterW" | "LetterX" | "LetterY" | "LetterZ" | "Shock" | "Mystery" | "Liquid" | "MAXLEGAL" | "Burst" | "Twinkle" | "MAX"): number;
getWork(index: number): number;
readonly groupActive: Group4;
readonly groupOther1: Group4;
readonly groupOther2: Group4;
readonly groupOther3: Group4;
readonly groupOther4: Group4;
/** The game stores an array of 6 groups: [0] is the group created by the player (empty if the player has never created one) [1] is the group the player is currently in (controls swarms, Great Marsh, Feebas etc.) Unnamed default group if the player has never joined one [2] through [5] are groups created by other players, imported via record mixing. These are joinable via the group NPC */
readonly groupPlayer: Group4;
isDaycareOccupied(index: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly isMysteryGiftUnlocked: boolean;
setIsMysteryGiftUnlocked(value: boolean): void;
readonly lottery: number;
setLottery(value: number): void;
readonly m: number;
setM(value: number): void;
readonly magic: number;
setMagic(value: number): void;
readonly maxFacility: "Tower" | "Factory" | "Hall" | "Castle" | "Arcade";
readonly mystery: MysteryBlock4;
readonly nationalDex: boolean;
setNationalDex(value: boolean): void;
readonly originalTrainerTrash: Uint8Array;
readonly progressFlags: number;
setProgressFlags(value: number): void;
readonly romCode: number;
setRomCode(value: number): void;
readonly records: Record4;
readonly region: number;
setRegion(value: number): void;
removeBackdrop(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset"): void;
readonly rivalName: string;
setRivalName(value: string): void;
readonly rivalNameTrash: Uint8Array;
setRivalNameTrash(value: Uint8Array): void;
setAccessoryOwnedCount(accessory: "WhiteFluff" | "YellowFluff" | "PinkFluff" | "BrownFluff" | "BlackFluff" | "OrangeFluff" | "RoundPebble" | "GlitterBoulder" | "SnaggyPebble" | "JaggedBoulder" | "BlackPebble" | "MiniPebble" | "PinkScale" | "BlueScale" | "GreenScale" | "PurpleScale" | "BigScale" | "NarrowScale" | "BlueFeather" | "RedFeather" | "YellowFeather" | "WhiteFeather" | "BlackMoustache" | "WhiteMoustache" | "BlackBeard" | "WhiteBeard" | "SmallLeaf" | "BigLeaf" | "NarrowLeaf" | "ShedClaw" | "ShedHorn" | "ThinMushroom" | "ThickMushroom" | "Stump" | "PrettyDewdrop" | "SnowCrystal" | "Sparks" | "ShimmeringFire" | "MysticFire" | "Determination" | "PeculiarSpoon" | "PuffySmoke" | "PoisonExtract" | "WealthyCoin" | "EerieThing" | "Spring" | "Seashell" | "HummingNote" | "ShinyPowder" | "GlitterPowder" | "RedFlower" | "PinkFlower" | "WhiteFlower" | "BlueFlower" | "OrangeFlower" | "YellowFlower" | "GooglySpecs" | "BlackSpecs" | "GorgeousSpecs" | "SweetCandy" | "Confetti" | "ColoredParasol" | "OldUmbrella" | "Spotlight" | "Cape" | "StandingMike" | "Surfboard" | "Carpet" | "RetroPipe" | "FluffyBed" | "MirrorBall" | "PhotoBoard" | "PinkBarrette" | "RedBarrette" | "BlueBarrette" | "YellowBarrette" | "GreenBarrette" | "PinkBalloon" | "RedBalloons" | "BlueBalloons" | "YellowBalloon" | "GreenBalloons" | "LaceHeadress" | "TopHat" | "SilkVeil" | "HeroicHeadband" | "ProfessorHat" | "FlowerStage" | "GoldPedestal" | "GlassStage" | "AwardPodium" | "CubeStage" | "TURTWIGMask" | "CHIMCHARMask" | "PIPLUPMask" | "BigTree" | "Flag" | "Crown" | "Tiara" | "Comet", count: number): void;
setBackdropPosition(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset", position: number): void;
setDaycareexp(index: number, value: number): void;
setDaycareOccupied(index: number, occupied: boolean): void;
setEventFlag(flagNumber: number, value: boolean): void;
setSealCase(value: Uint8Array): void;
setSealCount(id: "HeartA" | "HeartB" | "HeartC" | "HeartD" | "HeartE" | "HeartF" | "StarA" | "StarB" | "StarC" | "StarD" | "StarE" | "StarF" | "LineA" | "LineB" | "LineC" | "LineD" | "SmokeA" | "SmokeB" | "SmokeC" | "SmokeD" | "ElectricA" | "ElectricB" | "ElectricC" | "ElectricD" | "FoamyA" | "FoamyB" | "FoamyC" | "FoamyD" | "FireA" | "FireB" | "FireC" | "FireD" | "PartyA" | "PartyB" | "PartyC" | "PartyD" | "FloraA" | "FloraB" | "FloraC" | "FloraD" | "FloraE" | "FloraF" | "SongA" | "SongB" | "SongC" | "SongD" | "SongE" | "SongF" | "SongG" | "LetterA" | "LetterB" | "LetterC" | "LetterD" | "LetterE" | "LetterF" | "LetterG" | "LetterH" | "LetterI" | "LetterJ" | "LetterK" | "LetterL" | "LetterM" | "LetterN" | "LetterO" | "LetterP" | "LetterQ" | "LetterR" | "LetterS" | "LetterT" | "LetterU" | "LetterV" | "LetterW" | "LetterX" | "LetterY" | "LetterZ" | "Shock" | "Mystery" | "Liquid" | "MAXLEGAL" | "Burst" | "Twinkle" | "MAX", count: number): void;
setWork(index: number, value: number): void;
readonly sprite: number;
setSprite(value: number): void;
readonly swarmIndex: number;
setSwarmIndex(value: number): void;
readonly swarmMaxCountModulo: number;
readonly swarmSeed: number;
setSwarmSeed(value: number): void;
readonly x: number;
setX(value: number): void;
readonly x2: number;
setX2(value: number): void;
readonly y: number;
setY(value: number): void;
readonly y2: number;
setY2(value: number): void;
readonly z: number;
setZ(value: number): void;
}

export declare namespace SAV4 {
const magicJapanIntl: number;
function setMagicJapanIntl(value: number): void;
const magicKorean: number;
function setMagicKorean(value: number): void;
const sealMaxCount: number;
function setSealMaxCount(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV4BR`.
 * Kind: class.
 */
export interface SAV4BR extends SaveFile {
readonly brLanguage: "JapaneseOrEnglish" | "German" | "Spanish" | "French" | "Italian";
setBrLanguage(value: "JapaneseOrEnglish" | "German" | "Spanish" | "French" | "Italian"): void;
readonly battlePasses: BattlePassAccessor;
readonly birthDay: string;
setBirthDay(value: string): void;
readonly birthDayTrash: Uint8Array;
readonly birthMonth: string;
setBirthMonth(value: string): void;
readonly birthMonthTrash: Uint8Array;
readonly country: number;
setCountry(value: number): void;
readonly currentot: string;
setCurrentot(value: string): void;
readonly currentSlot: number;
setCurrentSlot(value: number): void;
findSlot(pk: PKM): readonly [number, number];
readonly gearShinyElectivireOutfit: boolean;
setGearShinyElectivireOutfit(value: boolean): void;
readonly gearShinyGroudonOutfit: boolean;
setGearShinyGroudonOutfit(value: boolean): void;
readonly gearShinyKyogreOutfit: boolean;
setGearShinyKyogreOutfit(value: boolean): void;
readonly gearShinyLucarioOutfit: boolean;
setGearShinyLucarioOutfit(value: boolean): void;
readonly gearShinyPachirisuOutfit: boolean;
setGearShinyPachirisuOutfit(value: boolean): void;
readonly gearShinyRoseradeOutfit: boolean;
setGearShinyRoseradeOutfit(value: boolean): void;
readonly gearUnlock: GearUnlock;
getBoxName(box: number): string;
readonly japanese: boolean;
/** Used to identify which save file created a given Battle Pass. */
readonly playerid: bigint;
setPlayerid(value: bigint): void;
readonly recordColosseumBattles: number;
setRecordColosseumBattles(value: number): void;
readonly recordCourtyardColosseumClears: number;
setRecordCourtyardColosseumClears(value: number): void;
readonly recordCrystalColosseumClears: number;
setRecordCrystalColosseumClears(value: number): void;
readonly recordFreeBattles: number;
setRecordFreeBattles(value: number): void;
readonly recordGatewayColosseumClears: number;
setRecordGatewayColosseumClears(value: number): void;
readonly recordMagmaColosseumClears: number;
setRecordMagmaColosseumClears(value: number): void;
readonly recordMainStreetColosseumClears: number;
setRecordMainStreetColosseumClears(value: number): void;
readonly recordNeonColosseumClears: number;
setRecordNeonColosseumClears(value: number): void;
readonly recordStargazerColosseumClears: number;
setRecordStargazerColosseumClears(value: number): void;
readonly recordSunnyParkColosseumClears: number;
setRecordSunnyParkColosseumClears(value: number): void;
readonly recordSunsetColosseumClears: number;
setRecordSunsetColosseumClears(value: number): void;
readonly recordTotalBattles: number;
setRecordTotalBattles(value: number): void;
readonly recordWaterfallColosseumClears: number;
setRecordWaterfallColosseumClears(value: number): void;
readonly recordWiFiBattles: number;
setRecordWiFiBattles(value: number): void;
readonly region: number;
setRegion(value: number): void;
readonly saveNames: readonly string[];
setSaveNames(value: readonly string[]): void;
/** The self-introduction in the player's profile. */
readonly selfIntroduction: string;
setSelfIntroduction(value: string): void;
readonly selfIntroductionTrash: Uint8Array;
setBoxName(box: number, value: readonly string[]): void;
readonly unlockedCourtyardColosseum: boolean;
setUnlockedCourtyardColosseum(value: boolean): void;
readonly unlockedCrystalColosseum: boolean;
setUnlockedCrystalColosseum(value: boolean): void;
readonly unlockedGatewayColosseum: boolean;
setUnlockedGatewayColosseum(value: boolean): void;
readonly unlockedMagmaColosseum: boolean;
setUnlockedMagmaColosseum(value: boolean): void;
readonly unlockedMainStreetColosseum: boolean;
setUnlockedMainStreetColosseum(value: boolean): void;
readonly unlockedNeonColosseum: boolean;
setUnlockedNeonColosseum(value: boolean): void;
readonly unlockedPostGame: boolean;
setUnlockedPostGame(value: boolean): void;
readonly unlockedStargazerColosseum: boolean;
setUnlockedStargazerColosseum(value: boolean): void;
readonly unlockedSunnyParkColosseum: boolean;
setUnlockedSunnyParkColosseum(value: boolean): void;
readonly unlockedSunsetColosseum: boolean;
setUnlockedSunsetColosseum(value: boolean): void;
readonly unlockedWaterfallColosseum: boolean;
setUnlockedWaterfallColosseum(value: boolean): void;
}

export declare namespace SAV4BR {
function decrypt(input: Uint8Array): void;
function isChecksumsValid(sav: Uint8Array): boolean;
function isValidSaveFile(data: Uint8Array): boolean;
const sizeHalf: number;
function setSizeHalf(value: number): void;
function verifyChecksum(input: Uint8Array, offset: number, len: number, chkOffset: number): boolean;
}

/**
 * Projected from `PKHeX.Core.SAV4DP`.
 * Kind: class.
 */
export interface SAV4DP extends SaveFile {
readonly roamerCresselia: Roamer4;
readonly roamerMesprit: Roamer4;
readonly roamerUnused: Roamer4;
}

export declare namespace SAV4DP {
const generalSize: number;
function setGeneralSize(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV4HGSS`.
 * Kind: class.
 */
export interface SAV4HGSS extends SaveFile {
readonly badges16: number;
setBadges16(value: number): void;
/** The box structure stores bitflags to indicate which boxes have changed; used when saving to skip unchanged boxes. */
readonly flagsBoxContentChanged: number;
setFlagsBoxContentChanged(value: number): void;
getApricornCount(index: number): number;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getCallerAtIndex(index: number): "None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest";
getPokeGearRoloDex(): readonly ("None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest")[];
getPokewalkerCoursesUnlocked(value: readonly boolean[]): void;
readonly lockCapsuleSlot: PCD;
setLockCapsuleSlot(value: PCD): void;
readonly mapUnlockState: "Johto" | "JohtoPlus" | "JohtoKanto" | "Invalid";
setMapUnlockState(value: "Johto" | "JohtoPlus" | "JohtoKanto" | "Invalid"): void;
pokeGearClearAllCallers(start: number): void;
pokeGearUnlockAllCallers(): void;
pokeGearUnlockAllCallersNoTrainers(): void;
readonly pokeathlon: Pokeathlon4;
pokewalkerCoursesSetAll(bitFlags: number): void;
/** Unlocks all Pokéwalker courses -- be nice and unlock all even if not available for the save file's language. */
pokewalkerCoursesUnlockAll(): void;
pokewalkerCoursesUnlockNone(): void;
readonly pokewalkerSteps: number;
setPokewalkerSteps(value: number): void;
readonly pokewalkerWatts: number;
setPokewalkerWatts(value: number): void;
readonly roamerEntei: Roamer4;
readonly roamerLatias: Roamer4;
readonly roamerLatios: Roamer4;
readonly roamerRaikou: Roamer4;
setApricornCount(index: number, count: number): void;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setCallerAtIndex(index: number, caller: "None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest"): void;
setPokeGearRoloDex(value: readonly ("None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest")[]): void;
setPokewalkerCoursesUnlocked(value: readonly boolean[]): void;
}

export declare namespace SAV4HGSS {
const generalSize: number;
function setGeneralSize(value: number): void;
function getPossiblePokewalkerCourseUnlock(language: number): number;
const pokewalkerCourseFlagCount: number;
function setPokewalkerCourseFlagCount(value: number): void;
const walkerPair: number;
function setWalkerPair(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV4Pt`.
 * Kind: class.
 */
export interface SAV4Pt extends SaveFile {
getToughWordUnlocked(word: "EarthTones" | "Implant" | "GoldenRatio" | "Omnibus" | "Starboard" | "MoneyRate" | "Resolution" | "Cadenza" | "Education" | "Cubism" | "CrossStitch" | "Artery" | "BoneDensity" | "Gommage" | "Streaming" | "Conductivity" | "Copyright" | "TwoStep" | "Contour" | "Neutrino" | "Howling" | "Spreadsheet" | "GMT" | "Irritability" | "Fractals" | "Flambe" | "StockPrices" | "PHBalance" | "Vector" | "Polyphenol" | "Ubiquitous" | "REMSleep"): boolean;
getVillaFurniturePurchased(index: "BigSofa" | "SmallSofa" | "Bed" | "NightTable" | "TV" | "AudioSystem" | "Bookshelf" | "Rack" | "Houseplant" | "PCDesk" | "MusicBox" | "PokemonBust1" | "PokemonBust2" | "Piano" | "GuestSet" | "WallClock" | "Masterpiece" | "TeaSet" | "Chandelier"): boolean;
getWallpaperUnlocked(wallpaperId: "Forest" | "City" | "Desert" | "Savanna" | "Crag" | "Volcano" | "Snow" | "Cave" | "Beach" | "Seafloor" | "River" | "Sky" | "Checks" | "PokeCenter" | "Machine" | "Simple" | "Distortion" | "Contest" | "Nostalgic" | "Croagunk" | "trio" | "PikaPika" | "Legend" | "Team_Galactic"): boolean;
readonly roamerArticuno: Roamer4;
readonly roamerCresselia: Roamer4;
readonly roamerMesprit: Roamer4;
readonly roamerMoltres: Roamer4;
readonly roamerUnused: Roamer4;
readonly roamerZapdos: Roamer4;
setToughWordUnlocked(word: "EarthTones" | "Implant" | "GoldenRatio" | "Omnibus" | "Starboard" | "MoneyRate" | "Resolution" | "Cadenza" | "Education" | "Cubism" | "CrossStitch" | "Artery" | "BoneDensity" | "Gommage" | "Streaming" | "Conductivity" | "Copyright" | "TwoStep" | "Contour" | "Neutrino" | "Howling" | "Spreadsheet" | "GMT" | "Irritability" | "Fractals" | "Flambe" | "StockPrices" | "PHBalance" | "Vector" | "Polyphenol" | "Ubiquitous" | "REMSleep", value: boolean): void;
setVillaFurniturePurchased(index: "BigSofa" | "SmallSofa" | "Bed" | "NightTable" | "TV" | "AudioSystem" | "Bookshelf" | "Rack" | "Houseplant" | "PCDesk" | "MusicBox" | "PokemonBust1" | "PokemonBust2" | "Piano" | "GuestSet" | "WallClock" | "Masterpiece" | "TeaSet" | "Chandelier", value: boolean): void;
setWallpaperUnlocked(wallpaperId: "Forest" | "City" | "Desert" | "Savanna" | "Crag" | "Volcano" | "Snow" | "Cave" | "Beach" | "Seafloor" | "River" | "Sky" | "Checks" | "PokeCenter" | "Machine" | "Simple" | "Distortion" | "Contest" | "Nostalgic" | "Croagunk" | "trio" | "PikaPika" | "Legend" | "Team_Galactic", value: boolean): void;
}

export declare namespace SAV4Pt {
const generalSize: number;
function setGeneralSize(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV4Ranch`.
 * Kind: class.
 */
export interface SAV4Ranch extends SaveFile {
readonly currentRanchLevel: number;
setCurrentRanchLevel(value: number): void;
getRanchMii(index: number): RanchMii;
getRanchToy(index: number): RanchToy;
getRanchTrainerMii(index: number): RanchTrainerMii;
readonly maxMiiCount: number;
readonly maxToyCount: number;
readonly maxToyid: number;
readonly miiCount: number;
readonly nextHayleyBringNationalDex: number;
setNextHayleyBringNationalDex(value: number): void;
readonly plannedRanchLevel: number;
setPlannedRanchLevel(value: number): void;
readonly saveRevision: number;
readonly saveRevisionString: string;
readonly secondsSince2000: number;
setSecondsSince2000(value: number): void;
setRanchMii(trainer: RanchMii, index: number): void;
setRanchToy(toy: RanchToy, index: number): void;
setRanchTrainerMii(mii: RanchTrainerMii, index: number): void;
readonly totalSeconds: number;
setTotalSeconds(value: number): void;
readonly trainerMiiCount: number;
writeBoxSlotInternal(pk: PKM, data: Uint8Array, htName: string, htTID: number, htSID: number, type: "None" | "Trainer" | "Hayley" | "Hayley_Traded"): void;
}

/**
 * Projected from `PKHeX.Core.SAV4Sinnoh`.
 * Kind: abstract.
 */
export interface SAV4Sinnoh extends SaveFile {
readonly currentPoketchApp: number;
setCurrentPoketchApp(value: number): void;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getHoneyTree(index: number): HoneyTreeValue;
getHoneyTreeSpecies(group: number, index: number): number;
getPoketchAppUnlocked(index: "Digital_Watch" | "Calculator" | "Memo_Pad" | "Pedometer" | "Party" | "Friendship_Checker" | "Dowsing_Machine" | "Berry_Searcher" | "Daycare" | "History" | "Counter" | "Analog_Watch" | "Marking_Map" | "Link_Searcher" | "Coin_Toss" | "Move_Tester" | "Calendar" | "Dot_Artist" | "Roulette" | "Trainer_Counter" | "Kitchen_Timer" | "Color_Changer" | "Matchup_Checker" | "Stopwatch" | "Alarm_Clock"): boolean;
getPoketchDotArtistData(): Uint8Array;
getSafariIndex(slot: number): number;
getugiGoods(): Uint8Array;
/** First 40 are the sphere type, last 40 are the sphere sizes */
getugiSpheres(): Uint8Array;
getugiTraps(): Uint8Array;
getugiTreasures(): Uint8Array;
readonly ofsPoffinCase: number;
setOfsPoffinCase(value: number): void;
readonly poketchColor: "Green" | "Yellow" | "Orange" | "Red" | "Purple" | "Blue" | "Turquoise" | "White";
setPoketchColor(value: "Green" | "Yellow" | "Orange" | "Red" | "Purple" | "Blue" | "Turquoise" | "White"): void;
readonly poketchEnabled: boolean;
setPoketchEnabled(value: boolean): void;
readonly poketchFlag1: boolean;
setPoketchFlag1(value: boolean): void;
readonly poketchFlag2: boolean;
setPoketchFlag2(value: boolean): void;
readonly poketchFlag6: boolean;
setPoketchFlag6(value: boolean): void;
readonly poketchFlag7: boolean;
setPoketchFlag7(value: boolean): void;
readonly poketchStepCounter: number;
setPoketchStepCounter(value: number): void;
readonly poketchUnlockedCount: number;
setPoketchUnlockedCount(value: number): void;
readonly safariSeed: number;
setSafariSeed(value: number): void;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setHoneyTree(tree: HoneyTreeValue, index: number): void;
setPoketchAppUnlocked(index: "Digital_Watch" | "Calculator" | "Memo_Pad" | "Pedometer" | "Party" | "Friendship_Checker" | "Dowsing_Machine" | "Berry_Searcher" | "Daycare" | "History" | "Counter" | "Analog_Watch" | "Marking_Map" | "Link_Searcher" | "Coin_Toss" | "Move_Tester" | "Calendar" | "Dot_Artist" | "Roulette" | "Trainer_Counter" | "Kitchen_Timer" | "Color_Changer" | "Matchup_Checker" | "Stopwatch" | "Alarm_Clock", value: boolean): void;
setPoketchDotArtistData(value: Uint8Array): void;
setSafariIndex(slot: number, value: number): void;
readonly ugFlagsCaptured: number;
setUgFlagsCaptured(value: number): void;
readonly ugFlagsFromMe: number;
setUgFlagsFromMe(value: number): void;
readonly ugFlagsRecovered: number;
setUgFlagsRecovered(value: number): void;
readonly ugFlagsTaken: number;
setUgFlagsTaken(value: number): void;
readonly ugFossils: number;
setUgFossils(value: number): void;
readonly ugGiftsGiven: number;
setUgGiftsGiven(value: number): void;
readonly ugGiftsReceived: number;
setUgGiftsReceived(value: number): void;
readonly ugHelpedOthers: number;
setUgHelpedOthers(value: number): void;
readonly ugMyBaseMoved: number;
setUgMyBaseMoved(value: number): void;
readonly ugPeopleMet: number;
setUgPeopleMet(value: number): void;
readonly ugSpheres: number;
setUgSpheres(value: number): void;
readonly ugTrapPlayers: number;
setUgTrapPlayers(value: number): void;
readonly ugTrapSelf: number;
setUgTrapSelf(value: number): void;
}

export declare namespace SAV4Sinnoh {
const ugMax: number;
function setUgMax(value: number): void;
const ugPouchSize: number;
function setUgPouchSize(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV5`.
 * Kind: abstract.
 */
export interface SAV5 extends SaveFile {
readonly adventureInfo: AdventureInfo5;
readonly allBlocks: readonly BlockInfo[];
readonly battleBox: BattleBox5;
readonly battleSubway: BattleSubway5;
readonly battleSubwayPlay: BattleSubwayPlay5;
readonly battleTest: Uint8Array;
readonly battleVideoDownload1: Uint8Array;
readonly battleVideoDownload2: Uint8Array;
readonly battleVideoDownload3: Uint8Array;
readonly battleVideoNative: Uint8Array;
readonly boxLayout: BoxLayout5;
readonly cgearSkinData: Uint8Array;
readonly chatter: Chatter5;
readonly country: number;
setCountry(value: number): void;
readonly daycare: Daycare5;
readonly daycareSlotCount: number;
readonly encount: Encount5;
readonly entralink: Entralink5;
readonly entreeForest: EntreeForest;
readonly eventWork: EventWork5;
readonly forest: WhiteBlack5;
readonly gts: GTS5;
getBattleVideo(index: number): Uint8Array;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getDaycareexp(slot: number): number;
getDaycareSlot(slot: number): Uint8Array;
getMail(mailIndex: number): MailDetail;
getMailData(offset: number): Uint8Array;
readonly globalLink: GlobalLink5;
readonly hallOfFame1: Uint8Array;
readonly hallOfFame2: Uint8Array;
readonly isAvailablePokedexSkin: boolean;
setIsAvailablePokedexSkin(value: boolean): void;
isDaycareOccupied(slot: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly items: MyItem;
readonly link1Data: Uint8Array;
readonly link2Data: Uint8Array;
readonly misc: Misc5;
readonly musical: Musical5;
readonly musicalDownloadData: Uint8Array;
/** Variable sized NARC download depending on the game (B/W vs B2/W2). */
readonly musicalDownloadSize: number;
readonly mystery: MysteryBlock5;
readonly playerData: PlayerData5;
readonly playerPosition: PlayerPosition5;
readonly pokedexSkinData: Uint8Array;
readonly records: Record5;
readonly region: number;
setRegion(value: number): void;
setBattleTest(data: Uint8Array, count: number): void;
setBattleVideo(index: number, data: Uint8Array, count: number): void;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setCgearSkin(data: Uint8Array, count: number): void;
setDaycareexp(slot: number, value: number): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
setHallOfFame(data: Uint8Array, count: number): void;
setLink1Data(data: Uint8Array): void;
setLink2Data(data: Uint8Array): void;
setMusical(data: Uint8Array, count: number): void;
setPokeDexSkin(data: Uint8Array, count: number): void;
readonly skinInfo: SkinInfo5;
readonly unityTower: UnityTower5;
readonly zukan: Zukan5;
}

export declare namespace SAV5 {
function getMailOffset(index: number): number;
const hallOfFameSize: number;
function setHallOfFameSize(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV5B2W2`.
 * Kind: class.
 */
export interface SAV5B2W2 extends SaveFile {
readonly blocks: SaveBlockAccessor5B2W2;
readonly festa: FestaBlock5;
getKeyData(): Uint8Array;
getpwt(index: number): Uint8Array;
getPokestarMovie(index: number): Uint8Array;
readonly joinAvenue: JoinAvenue5;
readonly keys: KeySystem5;
readonly medals: MedalList5;
readonly pwt: PWTBlock5;
readonly rivalName: string;
setRivalName(value: string): void;
readonly rivalNameTrash: Uint8Array;
setRivalNameTrash(value: Uint8Array): void;
setKeyData(data: Uint8Array, count: number): void;
setpwt(index: number, data: Uint8Array, count: number): void;
setPokestarMovie(index: number, data: Uint8Array, count: number): void;
}

export declare namespace SAV5B2W2 {
const extUnk7e800: number;
function setExtUnk7e800(value: number): void;
const extUnkcrgf: number;
function setExtUnkcrgf(value: number): void;
const keyDataOffset: number;
function setKeyDataOffset(value: number): void;
const pwtCount: number;
function setPwtCount(value: number): void;
const pwtInterval: number;
function setPwtInterval(value: number): void;
const pwtLength: number;
function setPwtLength(value: number): void;
const pwtOffset: number;
function setPwtOffset(value: number): void;
const pokestarCount: number;
function setPokestarCount(value: number): void;
const pokestarInterval: number;
function setPokestarInterval(value: number): void;
const pokestarLength: number;
function setPokestarLength(value: number): void;
const pokestarOffset: number;
function setPokestarOffset(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV5BW`.
 * Kind: class.
 */
export interface SAV5BW extends SaveFile {
readonly blocks: SaveBlockAccessor5BW;
}

/**
 * Projected from `PKHeX.Core.SAV6`.
 * Kind: abstract.
 */
export interface SAV6 extends SaveFile {
readonly bp: number;
setBp(value: number): void;
readonly badges: number;
setBadges(value: number): void;
readonly consoleRegion: number;
setConsoleRegion(value: number): void;
readonly country: number;
setCountry(value: number): void;
readonly eventWork: EventWork6;
readonly gameSyncid: string;
setGameSyncid(value: string): void;
readonly gameSyncidSize: number;
readonly gameTime: GameTime6;
getjpegData(): Uint8Array;
getRecord(recordID: number): number;
getRecordMax(recordID: number): number;
getRecordOffset(recordID: number): number;
readonly hof: number;
setHof(value: number): void;
readonly itemInfo: ItemInfo6;
readonly items: MyItem;
readonly jpegTitle: string;
readonly overworld: FieldMoveModelSave6;
readonly pss: number;
setPss(value: number): void;
readonly played: PlayTime6;
readonly recordCount: number;
readonly records: RecordBlock6;
readonly region: number;
setRegion(value: number): void;
setRecord(recordID: number, value: number): void;
readonly situation: Situation6;
readonly status: MyStatus6;
readonly vivillon: number;
setVivillon(value: number): void;
}

/**
 * Projected from `PKHeX.Core.SAV6AO`.
 * Kind: class.
 */
export interface SAV6AO extends SaveFile {
readonly battleBox: BattleBox6;
readonly battleBoxLocked: boolean;
setBattleBoxLocked(value: boolean): void;
readonly berryField: BerryField6AO;
readonly blocks: SaveBlockAccessor6AO;
readonly boxLayout: BoxLayout6;
readonly config: ConfigSave6;
readonly contest: Contest6;
readonly daycareCount: number;
readonly encount: Encount6;
readonly fused: UnionPokemon6;
readonly gts: GTS6;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
readonly hallOfFame: HallOfFame6;
readonly link: LinkBlock6;
readonly maison: MaisonBlock;
readonly misc: Misc6AO;
readonly multiplayerSpriteid: number;
setMultiplayerSpriteid(value: number): void;
readonly mysteryGift: MysteryBlock6;
readonly opower: OPower6;
readonly puff: Puff6;
readonly sube: SubEventLog6AO;
readonly secretBase: SecretBase6Block;
setBoxName(box: number, name: readonly string[]): void;
setBoxWallpaper(box: number, wallpaper: number): void;
readonly superTrain: SuperTrainBlock;
readonly zukan: Zukan6AO;
}

/**
 * Projected from `PKHeX.Core.SAV6AODemo`.
 * Kind: class.
 */
export interface SAV6AODemo extends SaveFile {
readonly blocks: SaveBlockAccessor6AODemo;
}

/**
 * Projected from `PKHeX.Core.SAV6XY`.
 * Kind: class.
 */
export interface SAV6XY extends SaveFile {
readonly battleBox: BattleBox6;
readonly battleBoxLocked: boolean;
setBattleBoxLocked(value: boolean): void;
readonly berryField: BerryField6XY;
readonly blocks: SaveBlockAccessor6XY;
readonly boxLayout: BoxLayout6;
readonly config: ConfigSave6;
readonly daycareSlotCount: number;
readonly encount: Encount6;
readonly fashion: Fashion6XY;
readonly fused: UnionPokemon6;
readonly gts: GTS6;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getDaycareexp(index: number): number;
getDaycareSlot(index: number): Uint8Array;
readonly hallOfFame: HallOfFame6;
isDaycareOccupied(index: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly link: LinkBlock6;
readonly maison: MaisonBlock;
readonly misc: Misc6XY;
readonly multiplayerSpriteid: number;
setMultiplayerSpriteid(value: number): void;
readonly mysteryGift: MysteryBlock6;
readonly opower: OPower6;
readonly puff: Puff6;
readonly sube: SubEventLog6XY;
setBoxName(box: number, name: readonly string[]): void;
setBoxWallpaper(box: number, wallpaper: number): void;
setDaycareexp(index: number, exp: number): void;
setDaycareOccupied(index: number, occupied: boolean): void;
readonly superTrain: SuperTrainBlock;
unlockAllFriendSafariSlots(): void;
readonly zukan: Zukan6XY;
}

/**
 * Projected from `PKHeX.Core.SAV7`.
 * Kind: abstract.
 */
export interface SAV7 extends SaveFile {
readonly battleTree: BattleTree7;
readonly boxLayout: BoxLayout7;
readonly config: ConfigSave7;
readonly consoleRegion: number;
setConsoleRegion(value: number): void;
readonly country: number;
setCountry(value: number): void;
readonly daycare: Daycare7;
readonly daycareSlotCount: number;
readonly eventWork: EventWork7;
readonly fashion: FashionBlock7;
readonly festa: JoinFesta7;
readonly fieldMenu: FieldMenu7;
readonly fused: UnionPokemon7;
readonly gts: GTS7;
readonly gameSyncid: string;
setGameSyncid(value: string): void;
readonly gameSyncidSize: number;
readonly gameTime: GameTime7;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getDaycareSlot(index: number): Uint8Array;
getFusedSlotOffset(slot: number): number;
getRecord(recordID: number): number;
getRecordMax(recordID: number): number;
getRecordOffset(recordID: number): number;
isDaycareOccupied(index: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly items: MyItem;
readonly misc: Misc7;
readonly multiplayerSpriteid: number;
setMultiplayerSpriteid(value: number): void;
readonly myStatus: MyStatus7;
readonly mysteryGift: MysteryBlock7;
readonly overworld: FieldMoveModelSave7;
readonly played: PlayTime6;
readonly pokeFinder: PokeFinder7;
readonly recordCount: number;
readonly records: RecordBlock6;
readonly region: number;
setRegion(value: number): void;
readonly resortSave: ResortSave7;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setDaycareOccupied(index: number, occupied: boolean): void;
setRecord(recordID: number, value: number): void;
readonly situation: Situation7;
updateQrConstants(): void;
readonly zukan: Zukan7;
}

/**
 * Projected from `PKHeX.Core.SAV7SM`.
 * Kind: class.
 */
export interface SAV7SM extends SaveFile {
readonly blocks: SaveBlockAccessor7SM;
}

/**
 * Projected from `PKHeX.Core.SAV7USUM`.
 * Kind: class.
 */
export interface SAV7USUM extends SaveFile {
readonly battleAgency: BattleAgency7;
readonly blocks: SaveBlockAccessor7USUM;
}

/**
 * Projected from `PKHeX.Core.SAV7b`.
 * Kind: class.
 */
export interface SAV7b extends SaveFile {
readonly blocks: SaveBlockAccessor7b;
readonly captured: CaptureRecords;
readonly config: ConfigSave7b;
readonly coordinates: Coordinates7b;
readonly daycare: Daycare7b;
readonly eventWork: EventWork7b;
fixStoragePreWrite(): boolean;
readonly gameSyncid: string;
setGameSyncid(value: string): void;
readonly gameSyncidSize: number;
readonly giftRecords: WB7Records;
readonly items: MyItem7b;
readonly misc: Misc7b;
readonly park: GoParkStorage;
readonly played: PlayTime7b;
readonly playerGeoLocation: PlayerGeoLocation7b;
readonly status: MyStatus7b;
readonly storage: PokeListHeader;
readonly zukan: Zukan7b;
}

/**
 * Projected from `PKHeX.Core.SAV8BS`.
 * Kind: class.
 */
export interface SAV8BS extends SaveFile {
readonly battleTower: BattleTowerWork8b;
readonly battleTrainer: BattleTrainerStatus8b;
readonly berryTrees: BerryTreeGrowSave8b;
readonly boxLayout: BoxLayout8b;
readonly config: ConfigSave8b;
readonly contest: Contest8b;
readonly contestPhotoLanguage: ContestPhotoLanguage8b;
readonly daycare: Daycare8b;
readonly daycareSlotCount: number;
readonly encounter: EncounterSave8b;
readonly eventWorkCount: number;
readonly fieldGimmick: FieldGimmickSave8b;
readonly fieldObjects: FieldObjectSave8b;
readonly flagWork: FlagWork8b;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getDaycareSlot(index: number): Uint8Array;
getRecord(recordID: number): number;
getRecordMax(recordID: number): number;
getRecordOffset(recordID: number): number;
getWork(index: number): number;
readonly hasFirstSaveFileExpansion: boolean;
readonly hasSecondSaveFileExpansion: boolean;
isDaycareOccupied(slot: number): boolean;
readonly isEggAvailable: boolean;
setIsEggAvailable(value: boolean): void;
readonly items: MyItem8b;
readonly menuSelection: MenuSelect8b;
readonly myStatus: MyStatus8b;
readonly mysteryRecords: MysteryBlock8b;
readonly partyInfo: Party8b;
readonly played: PlayTime8b;
readonly player: PlayerData8b;
readonly poffins: PoffinSaveData8b;
readonly poketch: Poketch8b;
readonly random: RandomGroup8b;
readonly recordAdd: RecordAddData8b;
readonly recordCount: number;
readonly records: Record8b;
readonly rivalName: string;
setRivalName(value: string): void;
readonly rivalNameTrash: Uint8Array;
readonly saveRevision: number;
setSaveRevision(value: number): void;
readonly saveRevisionString: string;
readonly sealDeco: SealBallDecoData8b;
readonly sealList: SealList8b;
readonly selectBoundItems: SaveItemShortcut8b;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setDaycareOccupied(slot: number, occupied: boolean): void;
setRecord(recordID: number, value: number): void;
setWork(index: number, value: number): void;
readonly system: SystemData8b;
readonly timeScale: number;
setTimeScale(value: number): void;
readonly ugCount: UgCountRecord8b;
readonly ugSaveData: UgSaveData8b;
readonly underground: UndergroundItemList8b;
readonly unionRoomPenaltyTime: number;
setUnionRoomPenaltyTime(value: number): void;
readonly unionSave: UnionSaveData8b;
readonly zoneid: number;
setZoneid(value: number): void;
readonly zukan: Zukan8b;
readonly zukanExtra: ZukanSpinda8b;
}

/**
 * Projected from `PKHeX.Core.SAV8LA`.
 * Kind: class.
 */
export interface SAV8LA extends SaveFile {
readonly accessor: SCBlockAccessor;
readonly adventureStart: Epoch1970Value;
readonly allBlocks: readonly SCBlock[];
readonly areaSpawners: AreaSpawnerSet8a;
readonly blocks: SaveBlockAccessor8LA;
readonly boxInfo: Box8;
readonly boxLayout: BoxLayout8a;
readonly coordinates: Coordinates8a;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getValue(key: number): T;
readonly items: MyItem8a;
readonly lastSaved: Epoch1900DateTimeValue;
readonly myStatus: MyStatus8a;
readonly partyInfo: Party8a;
readonly played: PlayTime8b;
readonly pokedexSave: PokedexSave8a;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setValue(key: number, value: T): void;
}

/**
 * Projected from `PKHeX.Core.SAV8SWSH`.
 * Kind: class.
 */
export interface SAV8SWSH extends SaveFile {
readonly accessor: SCBlockAccessor;
readonly allBlocks: readonly SCBlock[];
readonly badges: number;
setBadges(value: number): void;
readonly blocks: SaveBlockAccessor8SWSH;
readonly boxInfo: Box8;
readonly boxLayout: BoxLayout8;
readonly coordinates: Coordinates8;
readonly daycare: Daycare8;
readonly fashion: FashionUnlock8;
readonly fused: Fused8;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getRecord(recordID: number): number;
getRecordMax(recordID: number): number;
getRecordOffset(recordID: number): number;
getValue(key: number): T;
readonly items: MyItem8;
readonly misc: Misc8;
readonly myStatus: MyStatus8;
readonly partyInfo: Party8;
readonly played: PlayTime7b;
readonly raidArmor: RaidSpawnList8;
readonly raidCrown: RaidSpawnList8;
readonly raidGalar: RaidSpawnList8;
readonly recordCount: number;
readonly records: Record8;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setRecord(recordID: number, value: number): void;
setValue(key: number, value: T): void;
readonly teamIndexes: TeamIndexes8;
readonly titleScreen: TitleScreen8;
readonly trainerCard: TrainerCard8;
unlockAllDiglett(): void;
readonly zukan: Zukan8;
}

/**
 * Projected from `PKHeX.Core.SAV9SV`.
 * Kind: class.
 */
export interface SAV9SV extends SaveFile {
readonly accessor: SCBlockAccessor;
activateSnacksworthLegendaries(): void;
readonly allBlocks: readonly SCBlock[];
readonly blocks: SaveBlockAccessor9SV;
readonly blueberryClubRoom: BlueberryClubRoom9;
readonly blueberryPoints: number;
setBlueberryPoints(value: number): void;
readonly blueberryQuestRecord: BlueberryQuestRecord9;
readonly boxInfo: Box9;
readonly boxLayout: BoxLayout9;
readonly boxLegendWallpaperFlag: number;
setBoxLegendWallpaperFlag(value: number): void;
collectAllStakes(): void;
readonly config: ConfigSave9;
readonly coordinates: Uint8Array;
readonly enrollmentDate: Epoch1900DateValue;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getValue(key: number): T;
readonly items: MyItem9;
readonly lastDateCycle: Epoch1970Value;
readonly lastSaved: Epoch1900DateTimeValue;
readonly leaguePoints: number;
setLeaguePoints(value: number): void;
readonly myStatus: MyStatus9;
readonly partyInfo: Party9;
readonly played: PlayTime9;
readonly playerAppearance: PlayerAppearance9;
readonly playerFashion: PlayerFashion9;
readonly playerRotation: Uint8Array;
readonly rw: number;
setRw(value: number): void;
readonly rx: number;
setRx(value: number): void;
readonly ry: number;
setRy(value: number): void;
readonly rz: number;
setRz(value: number): void;
readonly raidBlueberry: RaidSpawnList9;
readonly raidKitakami: RaidSpawnList9;
readonly raidPaldea: RaidSpawnList9;
readonly raidSevenStar: RaidSevenStar9;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setCoordinates(x: number, y: number, z: number): void;
setPlayerRotation(rx: number, ry: number, rz: number, rw: number): void;
setValue(key: number, value: T): void;
readonly teamIndexes: TeamIndexes8;
readonly throwStyle: "OriginalStyle" | "LeftHandedStyle" | "ElegantStyle" | "ReverentStyle" | "NinjaStyle" | "DaintyStyle" | "TwirlingStyle" | "SmugStyle" | "GalarianStarStyle";
setThrowStyle(value: "OriginalStyle" | "LeftHandedStyle" | "ElegantStyle" | "ReverentStyle" | "NinjaStyle" | "DaintyStyle" | "TwirlingStyle" | "SmugStyle" | "GalarianStarStyle"): void;
unlockAllCoaches(): void;
unlockAlltmRecipes(): void;
unlockAllThrowStyles(): void;
readonly x: number;
setX(value: number): void;
readonly y: number;
setY(value: number): void;
readonly z: number;
setZ(value: number): void;
readonly zukan: Zukan9;
}

/**
 * Projected from `PKHeX.Core.SAV9ZA`.
 * Kind: class.
 */
export interface SAV9ZA extends SaveFile {
readonly accessor: SCBlockAccessor;
readonly allBlocks: readonly SCBlock[];
readonly blocks: SaveBlockAccessor9ZA;
readonly boxInfo: Box8;
readonly boxLayout: BoxLayout9a;
readonly config: ConfigSave9a;
readonly coordinates: Coordinates9a;
readonly donuts: DonutPocket9a;
getBoxName(box: number): string;
getBoxWallpaper(box: number): number;
getValue(key: number): T;
readonly infiniteRoyale: InfiniteRoyale9a;
readonly items: MyItem9a;
readonly lastSaved: Epoch1900DateTimeValue;
readonly myStatus: MyStatus9a;
readonly partyInfo: Party9a;
readonly played: PlayTime9a;
readonly playerAppearance: PlayerAppearance9a;
readonly playerFashion: PlayerFashion9a;
readonly saveRevision: number;
readonly saveRevisionString: string;
setBoxName(box: number, value: readonly string[]): void;
setBoxWallpaper(box: number, value: number): void;
setValue(key: number, value: T): void;
readonly startTime: Epoch1900DateTimeValue;
readonly teamIndexes: TeamIndexes8;
readonly ticketPointsRoyale: number;
setTicketPointsRoyale(value: number): void;
readonly ticketPointsRoyaleInfinite: number;
setTicketPointsRoyaleInfinite(value: number): void;
readonly zukan: Zukan9a;
}

/**
 * Projected from `PKHeX.Core.SAV_BEEF`.
 * Kind: abstract.
 */
export interface SAV_BEEF extends SaveFile {
readonly allBlocks: readonly BlockInfo[];
/** Timestamp that the save file was last saved at (Secure Value) */
readonly timeStampCurrent: bigint;
setTimeStampCurrent(value: bigint): void;
/** Timestamp that the save file was saved at prior to the  (Secure Value) */
readonly timeStampPrevious: bigint;
setTimeStampPrevious(value: bigint): void;
}

/**
 * Projected from `PKHeX.Core.SAV_STADIUM`.
 * Kind: abstract.
 */
export interface SAV_STADIUM extends SaveFile {
getRegisteredTeams(): readonly SlotGroup[];
getTeam(team: number): SlotGroup;
readonly japanese: boolean;
readonly korean: boolean;
readonly saveRevision: number;
readonly saveRevisionString: string;
}

/**
 * Projected from `PKHeX.Core.SK2` (Gen2).
 * Kind: class.
 */
export interface SK2 extends PKM {
readonly caughtData: number;
setCaughtData(value: number): void;
convertTopk2(): PK2;
readonly heldMailid: number;
setHeldMailid(value: number): void;
isPossible(japanese: boolean): boolean;
readonly isRental: boolean;
setIsRental(value: boolean): void;
readonly metTimeOfDay: number;
setMetTimeOfDay(value: number): void;
readonly pokerusState: number;
setPokerusState(value: number): void;
swapLanguage(): void;
}

/**
 * Projected from `PKHeX.Core.SaveFile`.
 * Kind: abstract.
 */
export interface SaveFile {
adaptToSaveFile(pk: PKM, isParty: boolean, option: "UseDefault" | "Enable" | "Disable"): void;
readonly blankpkm: PKM;
readonly boxCount: number;
readonly boxData: readonly PKM[];
setBoxData(value: readonly PKM[]): void;
readonly boxFlags: Uint8Array;
setBoxFlags(value: Uint8Array): void;
readonly boxSlotCount: number;
readonly boxesUnlocked: number;
setBoxesUnlocked(value: number): void;
readonly buffer: Uint8Array;
setBuffer(value: Uint8Array): void;
/** Count of unique Species Caught (Owned) */
readonly caughtCount: number;
readonly checksumInfo: string;
readonly checksumsValid: boolean;
clearBoxes(BoxStart: number, BoxEnd: number, deleteCriteria: (arg0: PKM) => boolean): number;
clone(): SaveFile;
compressStorage(storedCount: number, slotPointers: readonly number[]): boolean;
readonly context: "None" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen8" | "Gen9" | "SplitInvalid" | "Gen7b" | "Gen8a" | "Gen8b" | "Gen9a" | "MaxInvalid";
copyChangesFrom(sav: SaveFile): void;
readonly currentBox: number;
setCurrentBox(value: number): void;
readonly data: Uint8Array;
deletePartySlot(slot: number): void;
readonly displaysid: number;
setDisplaysid(value: number): void;
readonly displaytid: number;
setDisplaytid(value: number): void;
readonly extension: string;
readonly gender: number;
setGender(value: number): void;
readonly generation: number;
getBoxBinary(box: number): Uint8Array;
getBoxData(box: number): readonly PKM[];
getBoxData(data: readonly PKM[], box: number, index: number): void;
getBoxOffset(box: number): number;
getBoxSlotAtIndex(box: number, slot: number): PKM;
getBoxSlotAtIndex(index: number): PKM;
getBoxSlotFlags(box: number, slot: number): "None" | "Party" | "Party1" | "Party2" | "Party3" | "Party4" | "Party5" | "Party6" | "BattleTeam" | "BattleTeam1" | "BattleTeam2" | "BattleTeam3" | "BattleTeam4" | "BattleTeam5" | "BattleTeam6" | "Starter" | "Locked";
getBoxSlotFlags(index: number): "None" | "Party" | "Party1" | "Party2" | "Party3" | "Party4" | "Party5" | "Party6" | "BattleTeam" | "BattleTeam1" | "BattleTeam2" | "BattleTeam3" | "BattleTeam4" | "BattleTeam5" | "BattleTeam6" | "Starter" | "Locked";
getBoxSlotFromIndex(index: number, box: number, slot: number): void;
getBoxSlotOffset(index: number): number;
getBoxSlotOffset(box: number, slot: number): number;
getCaught(species: number): boolean;
getDecryptedpkm(data: Uint8Array): PKM;
getFlag(data: Uint8Array, offset: number, bitIndex: number): boolean;
getFlag(offset: number, bitIndex: number): boolean;
getpcBinary(): Uint8Array;
getPartyOffset(slot: number): number;
getPartySlot(data: Uint8Array): PKM;
getPartySlotAtIndex(index: number): PKM;
getSeen(species: number): boolean;
getStoredSlot(data: Uint8Array): PKM;
getString(data: Uint8Array): string;
readonly hasBox: boolean;
readonly hasParty: boolean;
readonly hasPokeDex: boolean;
readonly heldItems: readonly number[];
readonly id32: number;
setId32(value: number): void;
readonly inventory: PlayerBag;
isAnySlotLockedInBox(BoxStart: number, BoxEnd: number): boolean;
isBoxSlotLocked(box: number, slot: number): boolean;
isBoxSlotLocked(index: number): boolean;
isBoxSlotOverwriteProtected(index: number): boolean;
isBoxSlotOverwriteProtected(box: number, slot: number): boolean;
ispkmPresent(data: Uint8Array): boolean;
isPartyAllEggs(except: number): boolean;
readonly isStorageFull: boolean;
isVersionValid(): boolean;
readonly language: number;
setLanguage(value: number): void;
loadString(data: Uint8Array, text: readonly string[]): number;
readonly maxAbilityid: number;
readonly maxBallid: number;
readonly maxCoins: number;
readonly maxev: number;
readonly maxGameid: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
readonly maxiv: number;
readonly maxItemid: number;
readonly maxMoney: number;
readonly maxMoveid: number;
readonly maxSpeciesid: number;
readonly maxStringLengthNickname: number;
readonly maxStringLengthTrainer: number;
readonly metadata: SaveFileMetadata;
setMetadata(value: SaveFileMetadata): void;
readonly minGameid: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
miscSaveInfo(): string;
modifyBoxes(action: (arg0: PKM) => void, BoxStart: number, BoxEnd: number): number;
readonly money: number;
setMoney(value: number): void;
moveBox(box: number, insertBeforeBox: number): boolean;
nextOpenBoxSlot(lastKnownOccupied: number): number;
readonly ot: string;
setOt(value: string): void;
readonly pkmExtensions: readonly string[];
readonly pkmType: Type;
readonly partyCount: number;
setPartyCount(value: number): void;
readonly partyData: readonly PKM[];
setPartyData(value: readonly PKM[]): void;
readonly percentCaught: number;
readonly percentSeen: number;
readonly personal: IPersonalTable;
readonly playTimeString: string;
readonly playedHours: number;
setPlayedHours(value: number): void;
readonly playedMinutes: number;
setPlayedMinutes(value: number): void;
readonly playedSeconds: number;
setPlayedSeconds(value: number): void;
readonly sid16: number;
setSid16(value: number): void;
readonly sizeBoxslot: number;
readonly sizeParty: number;
readonly sizeStored: number;
readonly secondsToFame: number;
setSecondsToFame(value: number): void;
readonly secondsToStart: number;
setSecondsToStart(value: number): void;
readonly seenCount: number;
setBoxBinary(data: Uint8Array, box: number): boolean;
setBoxData(value: readonly PKM[], box: number, index: number): number;
setBoxSlot(pk: PKM, data: Uint8Array, settings: EntityImportSettings): void;
setBoxSlotAtIndex(pk: PKM, index: number, settings: EntityImportSettings): void;
setBoxSlotAtIndex(pk: PKM, box: number, slot: number, settings: EntityImportSettings): void;
setCaught(species: number, caught: boolean): void;
setData(input: Uint8Array, offset: number): void;
setData(dest: Uint8Array, input: Uint8Array): void;
setFlag(data: Uint8Array, offset: number, bitIndex: number, value: boolean): void;
setFlag(offset: number, bitIndex: number, value: boolean): void;
setpcBinary(data: Uint8Array): boolean;
setPartySlot(pk: PKM, data: Uint8Array, settings: EntityImportSettings): void;
setPartySlotAtIndex(pk: PKM, index: number, settings: EntityImportSettings): void;
setSeen(species: number, seen: boolean): void;
setSlotFormatParty(pk: PKM, data: Uint8Array, settings: EntityImportSettings): void;
setSlotFormatStored(pk: PKM, data: Uint8Array, settings: EntityImportSettings): void;
setString(destBuffer: Uint8Array, value: readonly string[], maxLength: number, option: "None" | "ClearZero" | "Clear50" | "Clear7F" | "ClearFF" | "ClearZeroSafeTerminate"): number;
readonly slotCount: number;
sortBoxes(BoxStart: number, BoxEnd: number, sortMethod: (arg0: readonly PKM[], arg1: number) => readonly PKM[], reverse: boolean): number;
readonly state: SaveFileState;
swapBox(box1: number, box2: number): boolean;
readonly tid16: number;
setTid16(value: number): void;
readonly traineridDisplayFormat: "None" | "SixteenBitSingle" | "SixteenBit" | "SixDigit";
readonly trainersid7: number;
setTrainersid7(value: number): void;
readonly trainertid7: number;
setTrainertid7(value: number): void;
readonly version: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid";
setVersion(value: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid"): void;
write(setting: "None" | "ExcludeFooter" | "ExcludeHeader" | "ExcludeFinalize"): Uint8Array;
}

export declare namespace SaveFile {
const setUpdateSettings: EntityImportSettings;
}

/**
 * Projected from `PKHeX.Core.XK3` (Gen3).
 * Kind: class.
 */
export interface XK3 extends PKM {
readonly blockTrades: boolean;
setBlockTrades(value: boolean): void;
readonly capturedFlag: boolean;
setCapturedFlag(value: boolean): void;
convertTopk3(): PK3;
readonly currentRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setCurrentRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly encounterInfo: number;
setEncounterInfo(value: number): void;
readonly isShadow: boolean;
setIsShadow(value: boolean): void;
readonly nicknameDisplay: string;
setNicknameDisplay(value: string): void;
readonly nicknameDisplayTrash: Uint8Array;
readonly obedient: boolean;
setObedient(value: boolean): void;
readonly originalRegion: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL";
setOriginalRegion(value: "NoRegion" | "NTSC_J" | "NTSC_U" | "PAL"): void;
readonly purification: number;
setPurification(value: number): void;
resetNicknameDisplay(): void;
readonly shadowid: number;
setShadowid(value: number): void;
readonly unusedFlag0: boolean;
setUnusedFlag0(value: boolean): void;
readonly unusedFlag1: boolean;
setUnusedFlag1(value: boolean): void;
readonly unusedFlag3: boolean;
setUnusedFlag3(value: boolean): void;
}

/**
 * Projected from `PKHeX.Core.ZukanBase`1`.
 * Kind: abstract.
 */
export interface ZukanBase<T> {
caughtAll(shinyToo: boolean): void;
/** Count of unique Species Caught (Owned) */
readonly caughtCount: number;
caughtNone(): void;
clearDexEntryAll(species: number): void;
completeDex(shinyToo: boolean): void;
getCaught(species: number): boolean;
getSeen(species: number): boolean;
readonly percentCaught: number;
readonly percentSeen: number;
seenAll(shinyToo: boolean): void;
/** Count of unique Species Seen */
readonly seenCount: number;
seenNone(): void;
setAllSeen(value: boolean, shinyToo: boolean): void;
setDex(pk: PKM): void;
setDexEntryAll(species: number, shinyToo: boolean): void;
}

/**
 * Projected from `PKHeX.Core.Zukan`1`.
 * Kind: abstract.
 */
export interface Zukan<T> {
caughtAll(shinyToo: boolean): void;
caughtNone(): void;
clearDexEntryAll(species: number): void;
completeDex(shinyToo: boolean): void;
getCaught(species: number): boolean;
getDisplayed(bit: number, bitRegion: number): boolean;
getLanguageFlag(bit: number, lang: number): boolean;
getSeen(species: number): boolean;
getSeen(species: number, bitRegion: number): boolean;
seenAll(shinyToo: boolean): void;
seenNone(): void;
setAllCaught(value: boolean, shinyToo: boolean): void;
setAllSeen(value: boolean, shinyToo: boolean): void;
setCaught(species: number, value: boolean): void;
setCaughtSingle(species: number, value: boolean): void;
setDex(pk: PKM): void;
setDexEntriesAll(value: boolean, max: number, shinyToo: boolean): void;
setDexEntryAll(species: number, shinyToo: boolean): void;
setDisplayed(bit: number, bitRegion: number, value: boolean): void;
setLanguageFlag(bit: number, lang: number, value: boolean): void;
setSeen(species: number, value: boolean): void;
setSeen(species: number, bitRegion: number, value: boolean): void;
setSeenSingle(species: number, seen: boolean, shinyToo: boolean): void;
}

// ---- narrowing guards (concrete formats) ----
export declare function isBK4(entity: PKM): entity is BK4;
export declare function isCK3(entity: PKM): entity is CK3;
export declare function isPA8(entity: PKM): entity is PA8;
export declare function isPA9(entity: PKM): entity is PA9;
export declare function isPB7(entity: PKM): entity is PB7;
export declare function isPB8(entity: PKM): entity is PB8;
export declare function isPK1(entity: PKM): entity is PK1;
export declare function isPK2(entity: PKM): entity is PK2;
export declare function isPK3(entity: PKM): entity is PK3;
export declare function isPK4(entity: PKM): entity is PK4;
export declare function isPK5(entity: PKM): entity is PK5;
export declare function isPK6(entity: PKM): entity is PK6;
export declare function isPK7(entity: PKM): entity is PK7;
export declare function isPK8(entity: PKM): entity is PK8;
export declare function isPK9(entity: PKM): entity is PK9;
export declare function isRK4(entity: PKM): entity is RK4;
export declare function isSK2(entity: PKM): entity is SK2;
export declare function isXK3(entity: PKM): entity is XK3;

// ---- unresolved reference stubs: named types outside the scanned ----
// ---- class set (and generic parameters) resolve as unknown until ----
// ---- the reflector's projection scope widens to cover them.        ----
export type AdventureInfo5 = unknown;
export type AreaSpawnerSet8a = unknown;
export type BattleAgency7 = unknown;
export type BattleBox5 = unknown;
export type BattleBox6 = unknown;
export type BattlePassAccessor = unknown;
export type BattleSubway5 = unknown;
export type BattleSubwayPlay5 = unknown;
export type BattleTowerWork8b = unknown;
export type BattleTrainerStatus8b = unknown;
export type BattleTree7 = unknown;
export type BattleVideo3 = unknown;
export type BattleVideo4 = unknown;
export type BerryField6AO = unknown;
export type BerryField6XY = unknown;
export type BerryTreeGrowSave8b = unknown;
export type BlockInfo = unknown;
export type BlueberryClubRoom9 = unknown;
export type BlueberryQuestRecord9 = unknown;
export type Box8 = unknown;
export type Box9 = unknown;
export type BoxLayout5 = unknown;
export type BoxLayout6 = unknown;
export type BoxLayout7 = unknown;
export type BoxLayout8 = unknown;
export type BoxLayout8a = unknown;
export type BoxLayout8b = unknown;
export type BoxLayout9 = unknown;
export type BoxLayout9a = unknown;
export type CaptureRecords = unknown;
export type Chatter4 = unknown;
export type Chatter5 = unknown;
export type ConfigSave6 = unknown;
export type ConfigSave7 = unknown;
export type ConfigSave7b = unknown;
export type ConfigSave8b = unknown;
export type ConfigSave9 = unknown;
export type ConfigSave9a = unknown;
export type Contest6 = unknown;
export type Contest8b = unknown;
export type ContestPhotoLanguage8b = unknown;
export type Coordinates7b = unknown;
export type Coordinates8 = unknown;
export type Coordinates8a = unknown;
export type Coordinates9a = unknown;
export type Daycare5 = unknown;
export type Daycare7 = unknown;
export type Daycare7b = unknown;
export type Daycare8 = unknown;
export type Daycare8b = unknown;
export type DonutPocket9a = unknown;
export type Encount5 = unknown;
export type Encount5BW = unknown;
export type Encount6 = unknown;
export type EncounterSave8b = unknown;
export type EntityImportSettings = unknown;
export type Entralink5 = unknown;
export type Entralink5BW = unknown;
export type EntreeForest = unknown;
export type Epoch1900DateTimeValue = unknown;
export type Epoch1900DateValue = unknown;
export type Epoch1970Value = unknown;
export type EventWork5 = unknown;
export type EventWork5B2W2 = unknown;
export type EventWork5BW = unknown;
export type EventWork6 = unknown;
export type EventWork7 = unknown;
export type EventWork7SM = unknown;
export type EventWork7USUM = unknown;
export type EventWork7b = unknown;
export type Fashion6XY = unknown;
export type FashionBlock7 = unknown;
export type FashionUnlock8 = unknown;
export type FestaBlock5 = unknown;
export type FieldGimmickSave8b = unknown;
export type FieldMenu7 = unknown;
export type FieldMoveModelSave6 = unknown;
export type FieldMoveModelSave7 = unknown;
export type FieldObjectSave8b = unknown;
export type FlagWork8b = unknown;
export type Fused8 = unknown;
export type GTS5 = unknown;
export type GTS6 = unknown;
export type GTS7 = unknown;
export type GameDataCore = unknown;
export type GameDataPA8 = unknown;
export type GameDataPA9 = unknown;
export type GameDataPB7 = unknown;
export type GameDataPB8 = unknown;
export type GameDataPC9 = unknown;
export type GameDataPK8 = unknown;
export type GameDataPK9 = unknown;
export type GameTime6 = unknown;
export type GameTime7 = unknown;
export type GearUnlock = unknown;
export type GlobalLink5 = unknown;
export type GoParkStorage = unknown;
export type Group4 = unknown;
export type Hall4 = unknown;
export type HallOfFame6 = unknown;
export type HallOfFameReader1 = unknown;
export type HoneyTreeValue = unknown;
export type IBaseStat = unknown;
export type IGameDataSide = unknown;
export type IItemStorage = unknown;
export type IPermitRecord = unknown;
export type IPersonalMisc = unknown;
export type IPersonalTable = unknown;
export type ISaveBlock3Large = unknown;
export type ISaveBlock3Small = unknown;
export type ITrainerInfo = unknown;
export type IndividualValueSet = unknown;
export type InfiniteRoyale9a = unknown;
export type InventoryItem = unknown;
export type InventoryItem7 = unknown;
export type InventoryItem7b = unknown;
export type InventoryItem8 = unknown;
export type InventoryItem8a = unknown;
export type InventoryItem8b = unknown;
export type InventoryItem9 = unknown;
export type InventoryItem9a = unknown;
export type ItemInfo6 = unknown;
export type ItemStorage1 = unknown;
export type ItemStorage2 = unknown;
export type ItemStorage3Colo = unknown;
export type ItemStorage3E = unknown;
export type ItemStorage3RS = unknown;
export type ItemStorage3XD = unknown;
export type ItemStorage4DP = unknown;
export type ItemStorage4HGSS = unknown;
export type ItemStorage4Pt = unknown;
export type ItemStorage5B2W2 = unknown;
export type ItemStorage5BW = unknown;
export type ItemStorage6AO = unknown;
export type ItemStorage6XY = unknown;
export type ItemStorage7GG = unknown;
export type ItemStorage7SM = unknown;
export type ItemStorage7USUM = unknown;
export type ItemStorage8BDSP = unknown;
export type ItemStorage8LA = unknown;
export type ItemStorage8SWSH = unknown;
export type ItemStorage9SV = unknown;
export type ItemStorage9ZA = unknown;
export type JoinAvenue5 = unknown;
export type JoinFesta7 = unknown;
export type KeySystem5 = unknown;
export type LinkBlock6 = unknown;
export type Mail4 = unknown;
export type MailDetail = unknown;
export type MaisonBlock = unknown;
export type MedalList5 = unknown;
export type MenuSelect8b = unknown;
export type Misc5 = unknown;
export type Misc5BW = unknown;
export type Misc6AO = unknown;
export type Misc6XY = unknown;
export type Misc7 = unknown;
export type Misc7b = unknown;
export type Misc8 = unknown;
export type Musical5 = unknown;
export type MyItem = unknown;
export type MyItem5B2W2 = unknown;
export type MyItem5BW = unknown;
export type MyItem6AO = unknown;
export type MyItem6XY = unknown;
export type MyItem7SM = unknown;
export type MyItem7USUM = unknown;
export type MyItem7b = unknown;
export type MyItem8 = unknown;
export type MyItem8a = unknown;
export type MyItem8b = unknown;
export type MyItem9 = unknown;
export type MyItem9a = unknown;
export type MyStatus6 = unknown;
export type MyStatus6XY = unknown;
export type MyStatus7 = unknown;
export type MyStatus7b = unknown;
export type MyStatus8 = unknown;
export type MyStatus8a = unknown;
export type MyStatus8b = unknown;
export type MyStatus9 = unknown;
export type MyStatus9a = unknown;
export type MysteryBlock4 = unknown;
export type MysteryBlock4DP = unknown;
export type MysteryBlock4HGSS = unknown;
export type MysteryBlock4Pt = unknown;
export type MysteryBlock5 = unknown;
export type MysteryBlock6 = unknown;
export type MysteryBlock7 = unknown;
export type MysteryBlock8b = unknown;
export type OPower6 = unknown;
export type PCD = unknown;
export type PWTBlock5 = unknown;
export type Party8 = unknown;
export type Party8a = unknown;
export type Party8b = unknown;
export type Party9 = unknown;
export type Party9a = unknown;
export type PersonalInfo = unknown;
export type PersonalInfo1 = unknown;
export type PersonalInfo2 = unknown;
export type PersonalInfo3 = unknown;
export type PersonalInfo4 = unknown;
export type PersonalInfo5B2W2 = unknown;
export type PersonalInfo6AO = unknown;
export type PersonalInfo7 = unknown;
export type PersonalInfo7GG = unknown;
export type PersonalInfo8BDSP = unknown;
export type PersonalInfo8LA = unknown;
export type PersonalInfo8SWSH = unknown;
export type PersonalInfo9SV = unknown;
export type PersonalInfo9ZA = unknown;
export type PersonalTable1 = unknown;
export type PersonalTable2 = unknown;
export type PersonalTable3 = unknown;
export type PersonalTable4 = unknown;
export type PersonalTable5B2W2 = unknown;
export type PersonalTable5BW = unknown;
export type PersonalTable6AO = unknown;
export type PersonalTable6XY = unknown;
export type PersonalTable7 = unknown;
export type PersonalTable7GG = unknown;
export type PersonalTable8BDSP = unknown;
export type PersonalTable8LA = unknown;
export type PersonalTable8SWSH = unknown;
export type PersonalTable9SV = unknown;
export type PersonalTable9ZA = unknown;
export type PlayTime6 = unknown;
export type PlayTime7b = unknown;
export type PlayTime8b = unknown;
export type PlayTime9 = unknown;
export type PlayTime9a = unknown;
export type PlayerAppearance9 = unknown;
export type PlayerAppearance9a = unknown;
export type PlayerData5 = unknown;
export type PlayerData5B2W2 = unknown;
export type PlayerData8b = unknown;
export type PlayerFashion9 = unknown;
export type PlayerFashion9a = unknown;
export type PlayerGeoLocation7b = unknown;
export type PlayerPosition5 = unknown;
export type PoffinSaveData8b = unknown;
export type PokeFinder7 = unknown;
export type PokeListHeader = unknown;
export type Pokeathlon4 = unknown;
export type PokedexSave8a = unknown;
export type Poketch8b = unknown;
export type Puff6 = unknown;
export type RaidSevenStar9 = unknown;
export type RaidSpawnList8 = unknown;
export type RaidSpawnList9 = unknown;
export type RanchMii = unknown;
export type RanchToy = unknown;
export type RanchTrainerMii = unknown;
export type RandomGroup8b = unknown;
export type Record4 = unknown;
export type Record5 = unknown;
export type Record8 = unknown;
export type Record8b = unknown;
export type RecordAddData8b = unknown;
export type RecordBlock6 = unknown;
export type RecordBlock6AO = unknown;
export type RecordBlock6XY = unknown;
export type RecordBlock7SM = unknown;
export type RecordBlock7USUM = unknown;
export type ResortSave7 = unknown;
export type Roamer4 = unknown;
export type SAV3GCMemoryCard = unknown;
export type SCBlock = unknown;
export type SCBlockAccessor = unknown;
export type SaveBlock3LargeE = unknown;
export type SaveBlock3LargeFRLG = unknown;
export type SaveBlock3LargeRS = unknown;
export type SaveBlock3SmallE = unknown;
export type SaveBlock3SmallFRLG = unknown;
export type SaveBlock3SmallRS = unknown;
export type SaveBlockAccessor5B2W2 = unknown;
export type SaveBlockAccessor5BW = unknown;
export type SaveBlockAccessor6AO = unknown;
export type SaveBlockAccessor6AODemo = unknown;
export type SaveBlockAccessor6XY = unknown;
export type SaveBlockAccessor7SM = unknown;
export type SaveBlockAccessor7USUM = unknown;
export type SaveBlockAccessor7b = unknown;
export type SaveBlockAccessor8LA = unknown;
export type SaveBlockAccessor8SWSH = unknown;
export type SaveBlockAccessor9SV = unknown;
export type SaveBlockAccessor9ZA = unknown;
export type SaveFileMetadata = unknown;
export type SaveFileState = unknown;
export type SaveItemShortcut8b = unknown;
export type SealBallDecoData8b = unknown;
export type SealList8b = unknown;
export type SecretBase6Block = unknown;
export type Situation6 = unknown;
export type Situation7 = unknown;
export type SkinInfo5 = unknown;
export type SlotGroup = unknown;
export type SubEventLog6AO = unknown;
export type SubEventLog6XY = unknown;
export type SuperTrainBlock = unknown;
export type SystemData8b = unknown;
export type T = unknown;
export type TCompare = unknown;
export type TItem = unknown;
export type TeamIndexes8 = unknown;
export type TitleScreen8 = unknown;
export type TrainerCard8 = unknown;
export type Type = unknown;
export type UgCountRecord8b = unknown;
export type UgSaveData8b = unknown;
export type UndergroundItemList8b = unknown;
export type UnionPokemon6 = unknown;
export type UnionPokemon7 = unknown;
export type UnionSaveData8b = unknown;
export type UnityTower5 = unknown;
export type WB7Records = unknown;
export type WhiteBlack5 = unknown;
export type WhiteBlack5B2W2 = unknown;
export type WhiteBlack5BW = unknown;
export type Zukan4 = unknown;
export type Zukan5 = unknown;
export type Zukan6AO = unknown;
export type Zukan6XY = unknown;
export type Zukan7 = unknown;
export type Zukan7b = unknown;
export type Zukan8 = unknown;
export type Zukan8b = unknown;
export type Zukan9 = unknown;
export type Zukan9a = unknown;
export type ZukanSpinda8b = unknown;

/// Consumed 6805 members; suppressed 3593 as ancestor-shadowed.
