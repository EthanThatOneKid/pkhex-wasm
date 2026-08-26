# v2 API reference

The chapter below is generated from `runtime-meta-v2.json` by `deno task gen`, alongside the v2 declarations and entity module (ticket #35). It is normative; edit the projection, not this text. This surface coexists with the v1 chapters until the hard-replace cut retires them.

## v2 projected surface

> Generated from `runtime-meta-v2.json` — run `deno task gen`; never edit by hand.
> Renders from the same projection as [`tools/apigen/fixtures/pkhex-wasm-v2.d.ts`](../../tools/apigen/fixtures/pkhex-wasm-v2.d.ts)
> and `src/ts/gen/v2/entities.ts`; all three come from one `projectCoreMeta` pass.

`113` classes · `6805` members (`3593` ancestor-shadowed, suppressed) · `35` enums.

### Enum unions

#### `EntityContext`

`"None" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen8" \| "Gen9" \| "SplitInvalid" \| "Gen7b" \| "Gen8a" \| "Gen8b" \| "Gen9a" \| "MaxInvalid"`

#### `TrainerIDFormat`

`"None" \| "SixteenBitSingle" \| "SixteenBit" \| "SixDigit"`

#### `Nature`

`"Hardy" \| "Lonely" \| "Brave" \| "Adamant" \| "Naughty" \| "Bold" \| "Docile" \| "Relaxed" \| "Impish" \| "Lax" \| "Timid" \| "Hasty" \| "Serious" \| "Jolly" \| "Naive" \| "Modest" \| "Mild" \| "Quiet" \| "Bashful" \| "Rash" \| "Calm" \| "Gentle" \| "Sassy" \| "Careful" \| "Quirky" \| "Random"`

#### `GameVersion`

`"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"`

#### `StringConverterOption`

`"None" \| "ClearZero" \| "Clear50" \| "Clear7F" \| "ClearFF" \| "ClearZeroSafeTerminate"`

#### `Shiny`

`"Random" \| "Never" \| "Always" \| "AlwaysStar" \| "AlwaysSquare" \| "FixedValue"`

#### `GroundTileType`

`"None" \| "Sand" \| "Grass" \| "Puddle" \| "Rock" \| "Cave" \| "Snow" \| "Water" \| "Ice" \| "Building" \| "Marsh" \| "Bridge" \| "Elite4_1" \| "Max_DP" \| "Elite4_2" \| "Elite4_3" \| "Elite4_4" \| "Elite4_M" \| "DistortionSideways" \| "BattleTower" \| "BattleFactory" \| "BattleArcade" \| "BattleCastle" \| "BattleHall" \| "Distortion" \| "Max_Pt"`

#### `GCRegion`

`"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"`

#### `MarkingColor`

`"None" \| "Blue" \| "Pink"`

#### `HomeGameDataFormat`

`"None" \| "PB7" \| "PK8" \| "PA8" \| "PB8" \| "PK9" \| "PC9" \| "PA9"`

#### `ResortEventState`

`"NONE" \| "SEIKAKU" \| "CARE" \| "LIKE_RESORT" \| "LIKE_BATTLE" \| "LIKE_ADV" \| "GOOD_FRIEND" \| "GIM" \| "HOTSPA" \| "WILD" \| "WILD_LOVE" \| "WILD_LIVE" \| "POKEMAME_GET1" \| "POKEMAME_GET2" \| "POKEMAME_GET3" \| "KINOMI_HELP" \| "PLAY_STATE" \| "HOTSPA_STATE" \| "HOTSPA_DIZZY" \| "HOTSPA_EGG_HATCHING" \| "MAX"`

#### `MoveType`

`"Any" \| "Normal" \| "Fighting" \| "Flying" \| "Poison" \| "Ground" \| "Rock" \| "Bug" \| "Ghost" \| "Steel" \| "Fire" \| "Water" \| "Grass" \| "Electric" \| "Psychic" \| "Ice" \| "Dragon" \| "Dark" \| "Fairy"`

#### `RanchOwnershipType`

`"None" \| "Trainer" \| "Hayley" \| "Hayley_Traded"`

#### `RanchOwnershipStatus`

`"None" \| "Traded"`

#### `InventoryType`

`"None" \| "Items" \| "KeyItems" \| "TMHMs" \| "Medicine" \| "Berries" \| "Balls" \| "BattleItems" \| "MailItems" \| "PCItems" \| "FreeSpace" \| "ZCrystals" \| "Candy" \| "Treasure" \| "Ingredients" \| "MegaStones"`

#### `BinaryExportSetting`

`"None" \| "ExcludeFooter" \| "ExcludeHeader" \| "ExcludeFinalize"`

#### `EntityImportOption`

`"UseDefault" \| "Enable" \| "Disable"`

#### `StorageSlotSource`

`"None" \| "Party" \| "Party1" \| "Party2" \| "Party3" \| "Party4" \| "Party5" \| "Party6" \| "BattleTeam" \| "BattleTeam1" \| "BattleTeam2" \| "BattleTeam3" \| "BattleTeam4" \| "BattleTeam5" \| "BattleTeam6" \| "Starter" \| "Locked"`

#### `Stadium2TeamType`

`"Anything_Goes" \| "Little_Cup" \| "Poke_Cup" \| "Prime_Cup" \| "GymLeader_Castle" \| "Vs_Rival"`

#### `GBMobileCableColor`

`"None" \| "Blue" \| "Yellow" \| "Green" \| "Red" \| "Purple" \| "Black" \| "Pink" \| "Gray" \| "Debug" \| "Disabled"`

#### `GCVersion`

`"None" \| "FR" \| "LG" \| "S" \| "R" \| "E" \| "CXD"`

#### `LanguageGC`

`"Hacked" \| "Japanese" \| "English" \| "German" \| "French" \| "Italian" \| "Spanish" \| "UNUSED_6"`

#### `BattleFrontierFacility4`

`"Tower" \| "Factory" \| "Hall" \| "Castle" \| "Arcade"`

#### `Seal4`

`"HeartA" \| "HeartB" \| "HeartC" \| "HeartD" \| "HeartE" \| "HeartF" \| "StarA" \| "StarB" \| "StarC" \| "StarD" \| "StarE" \| "StarF" \| "LineA" \| "LineB" \| "LineC" \| "LineD" \| "SmokeA" \| "SmokeB" \| "SmokeC" \| "SmokeD" \| "ElectricA" \| "ElectricB" \| "ElectricC" \| "ElectricD" \| "FoamyA" \| "FoamyB" \| "FoamyC" \| "FoamyD" \| "FireA" \| "FireB" \| "FireC" \| "FireD" \| "PartyA" \| "PartyB" \| "PartyC" \| "PartyD" \| "FloraA" \| "FloraB" \| "FloraC" \| "FloraD" \| "FloraE" \| "FloraF" \| "SongA" \| "SongB" \| "SongC" \| "SongD" \| "SongE" \| "SongF" \| "SongG" \| "LetterA" \| "LetterB" \| "LetterC" \| "LetterD" \| "LetterE" \| "LetterF" \| "LetterG" \| "LetterH" \| "LetterI" \| "LetterJ" \| "LetterK" \| "LetterL" \| "LetterM" \| "LetterN" \| "LetterO" \| "LetterP" \| "LetterQ" \| "LetterR" \| "LetterS" \| "LetterT" \| "LetterU" \| "LetterV" \| "LetterW" \| "LetterX" \| "LetterY" \| "LetterZ" \| "Shock" \| "Mystery" \| "Liquid" \| "MAXLEGAL" \| "Burst" \| "Twinkle" \| "MAX"`

#### `Accessory4`

`"WhiteFluff" \| "YellowFluff" \| "PinkFluff" \| "BrownFluff" \| "BlackFluff" \| "OrangeFluff" \| "RoundPebble" \| "GlitterBoulder" \| "SnaggyPebble" \| "JaggedBoulder" \| "BlackPebble" \| "MiniPebble" \| "PinkScale" \| "BlueScale" \| "GreenScale" \| "PurpleScale" \| "BigScale" \| "NarrowScale" \| "BlueFeather" \| "RedFeather" \| "YellowFeather" \| "WhiteFeather" \| "BlackMoustache" \| "WhiteMoustache" \| "BlackBeard" \| "WhiteBeard" \| "SmallLeaf" \| "BigLeaf" \| "NarrowLeaf" \| "ShedClaw" \| "ShedHorn" \| "ThinMushroom" \| "ThickMushroom" \| "Stump" \| "PrettyDewdrop" \| "SnowCrystal" \| "Sparks" \| "ShimmeringFire" \| "MysticFire" \| "Determination" \| "PeculiarSpoon" \| "PuffySmoke" \| "PoisonExtract" \| "WealthyCoin" \| "EerieThing" \| "Spring" \| "Seashell" \| "HummingNote" \| "ShinyPowder" \| "GlitterPowder" \| "RedFlower" \| "PinkFlower" \| "WhiteFlower" \| "BlueFlower" \| "OrangeFlower" \| "YellowFlower" \| "GooglySpecs" \| "BlackSpecs" \| "GorgeousSpecs" \| "SweetCandy" \| "Confetti" \| "ColoredParasol" \| "OldUmbrella" \| "Spotlight" \| "Cape" \| "StandingMike" \| "Surfboard" \| "Carpet" \| "RetroPipe" \| "FluffyBed" \| "MirrorBall" \| "PhotoBoard" \| "PinkBarrette" \| "RedBarrette" \| "BlueBarrette" \| "YellowBarrette" \| "GreenBarrette" \| "PinkBalloon" \| "RedBalloons" \| "BlueBalloons" \| "YellowBalloon" \| "GreenBalloons" \| "LaceHeadress" \| "TopHat" \| "SilkVeil" \| "HeroicHeadband" \| "ProfessorHat" \| "FlowerStage" \| "GoldPedestal" \| "GlassStage" \| "AwardPodium" \| "CubeStage" \| "TURTWIGMask" \| "CHIMCHARMask" \| "PIPLUPMask" \| "BigTree" \| "Flag" \| "Crown" \| "Tiara" \| "Comet"`

#### `Backdrop4`

`"DressUp" \| "Ranch" \| "CityatNight" \| "SnowyTown" \| "Fiery" \| "OuterSpace" \| "Desert" \| "CumulusCloud" \| "FlowerPatch" \| "FutureRoom" \| "OpenSea" \| "TotalDarkness" \| "TatamiRoom" \| "GingerbreadRoom" \| "Seafloor" \| "Underground" \| "Sky" \| "Theater" \| "Unset"`

#### `LanguageBR`

`"JapaneseOrEnglish" \| "German" \| "Spanish" \| "French" \| "Italian"`

#### `MapUnlockState4`

`"Johto" \| "JohtoPlus" \| "JohtoKanto" \| "Invalid"`

#### `PokegearNumber`

`"None" \| "Mother" \| "Professor_Elm" \| "Professor_Oak" \| "Ethan" \| "Lyra" \| "Kurt" \| "Daycare_Man" \| "Daycare_Lady" \| "Buena" \| "Bill" \| "Joey" \| "Ralph" \| "Liz" \| "Wade" \| "Anthony" \| "Bike_Shop" \| "Kenji" \| "Whitney" \| "Falkner" \| "Jack" \| "Chad" \| "Brent" \| "Todd" \| "Arnie" \| "Baoba" \| "Irwin" \| "Janine" \| "Clair" \| "Erika" \| "Misty" \| "Blaine" \| "Blue" \| "Chuck" \| "Brock" \| "Bugsy" \| "Sabrina" \| "Lieutenant_Surge" \| "Morty" \| "Jasmine" \| "Pryce" \| "Huey" \| "Gaven" \| "Jamie" \| "Reena" \| "Vance" \| "Parry" \| "Erin" \| "Beverly" \| "Jose" \| "Gina" \| "Alan" \| "Dana" \| "Derek" \| "Tully" \| "Tiffany" \| "Wilton" \| "Krise" \| "Ian" \| "Walt" \| "Alfred" \| "Doug" \| "Rob" \| "Kyle" \| "Kyler" \| "Tim_and_Sue" \| "Kenny" \| "Tanner" \| "Josh" \| "Torin" \| "Hillary" \| "Billy" \| "Kay_and_Tia" \| "Reese" \| "Aiden" \| "Ernest"`

#### `Wallpaper4Pt`

`"Forest" \| "City" \| "Desert" \| "Savanna" \| "Crag" \| "Volcano" \| "Snow" \| "Cave" \| "Beach" \| "Seafloor" \| "River" \| "Sky" \| "Checks" \| "PokeCenter" \| "Machine" \| "Simple" \| "Distortion" \| "Contest" \| "Nostalgic" \| "Croagunk" \| "trio" \| "PikaPika" \| "Legend" \| "Team_Galactic"`

#### `ToughWord4`

`"EarthTones" \| "Implant" \| "GoldenRatio" \| "Omnibus" \| "Starboard" \| "MoneyRate" \| "Resolution" \| "Cadenza" \| "Education" \| "Cubism" \| "CrossStitch" \| "Artery" \| "BoneDensity" \| "Gommage" \| "Streaming" \| "Conductivity" \| "Copyright" \| "TwoStep" \| "Contour" \| "Neutrino" \| "Howling" \| "Spreadsheet" \| "GMT" \| "Irritability" \| "Fractals" \| "Flambe" \| "StockPrices" \| "PHBalance" \| "Vector" \| "Polyphenol" \| "Ubiquitous" \| "REMSleep"`

#### `VillaFurniture4`

`"BigSofa" \| "SmallSofa" \| "Bed" \| "NightTable" \| "TV" \| "AudioSystem" \| "Bookshelf" \| "Rack" \| "Houseplant" \| "PCDesk" \| "MusicBox" \| "PokemonBust1" \| "PokemonBust2" \| "Piano" \| "GuestSet" \| "WallClock" \| "Masterpiece" \| "TeaSet" \| "Chandelier"`

#### `PoketchColor`

`"Green" \| "Yellow" \| "Orange" \| "Red" \| "Purple" \| "Blue" \| "Turquoise" \| "White"`

#### `PoketchApp`

`"Digital_Watch" \| "Calculator" \| "Memo_Pad" \| "Pedometer" \| "Party" \| "Friendship_Checker" \| "Dowsing_Machine" \| "Berry_Searcher" \| "Daycare" \| "History" \| "Counter" \| "Analog_Watch" \| "Marking_Map" \| "Link_Searcher" \| "Coin_Toss" \| "Move_Tester" \| "Calendar" \| "Dot_Artist" \| "Roulette" \| "Trainer_Counter" \| "Kitchen_Timer" \| "Color_Changer" \| "Matchup_Checker" \| "Stopwatch" \| "Alarm_Clock"`

#### `ThrowStyle9`

`"OriginalStyle" \| "LeftHandedStyle" \| "ElegantStyle" \| "ReverentStyle" \| "NinjaStyle" \| "DaintyStyle" \| "TwirlingStyle" \| "SmugStyle" \| "GalarianStarStyle"`

### Entities

### `BK4`

*kind: class · context: Gen4 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `convertTopk4()` | `PK4` |  |
| `isDecryptedStateBox` | `boolean` | get/set via `setIsDecryptedStateBox()` |
| `isDecryptedStateParty` | `boolean` | get/set via `setIsDecryptedStateParty()` |

### `Bank3`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getBoxName(box: number)` | `string` |  |

### `Bank4`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getBoxName(box: number)` | `string` |  |

### `Bank7`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getBoxIndex(box: number)` | `number` |  |
| `getBoxName(box: number)` | `string` |  |
| `getBoxNameOffset(box: number)` | `number` |  |
| `getGroupName(group: number)` | `string` |  |
| `uid` | `bigint` | get-only |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getBank7(data: Uint8Array)` | `Bank7` |  |

### `BulkStorage`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `isBigEndian` | `boolean` | get-only |

### `CK3`

*kind: class · context: Gen3 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `convertTopk3()` | `PK3` |  |
| `currentRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setCurrentRegion()` |
| `expShadow` | `number` | get/set via `setExpShadow()` |
| `forceCorrectFatefulState(japanese: boolean, value: boolean)` | `void` |  |
| `isFatefulValid(japanese: boolean)` | `boolean` |  |
| `isShadow` | `boolean` | get-only |
| `nicknameDisplay` | `string` | get/set via `setNicknameDisplay()` |
| `nicknameDisplayTrash` | `Uint8Array` | get-only |
| `originalRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setOriginalRegion()` |
| `partySlot` | `number` | get/set via `setPartySlot()` |
| `purification` | `number` | get/set via `setPurification()` |
| `resetNicknameDisplay()` | `void` |  |
| `shadowid` | `number` | get/set via `setShadowid()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `purified` | `number` | get/set via `setPurified()` |

### `EmptyPlayerBag`

*kind: class · extends `PlayerBag`.*

### `FakeSaveFile`

*kind: class · extends `SaveFile`.*

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `default_` | `FakeSaveFile` | get/set via `setDefault()` — Represents the default instance of the  class. |

### `G3PKM`

*kind: abstract · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `abilityBit` | `boolean` | get/set via `setAbilityBit()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `getMarking(index: number)` | `boolean` |  |
| `markingCircle` | `boolean` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingHeart` | `boolean` | get/set via `setMarkingHeart()` |
| `markingSquare` | `boolean` | get/set via `setMarkingSquare()` |
| `markingTriangle` | `boolean` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountg3Beauty` | `number` | get/set via `setRibbonCountg3Beauty()` |
| `ribbonCountg3Cool` | `number` | get/set via `setRibbonCountg3Cool()` |
| `ribbonCountg3Cute` | `number` | get/set via `setRibbonCountg3Cute()` |
| `ribbonCountg3Smart` | `number` | get/set via `setRibbonCountg3Smart()` |
| `ribbonCountg3Tough` | `number` | get/set via `setRibbonCountg3Tough()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonVictory` | `boolean` | get/set via `setRibbonVictory()` |
| `ribbonWinning` | `boolean` | get/set via `setRibbonWinning()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `setMarking(index: number, value: boolean)` | `void` |  |
| `speciesInternal` | `number` | get/set via `setSpeciesInternal()` |
| `unused1` | `boolean` | get/set via `setUnused1()` |
| `unused2` | `boolean` | get/set via `setUnused2()` |
| `unused3` | `boolean` | get/set via `setUnused3()` |
| `unused4` | `boolean` | get/set via `setUnused4()` |

### `G4PKM`

*kind: abstract · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `balldpPt` | `number` | get/set via `setBalldpPt()` |
| `ballhgss` | `number` | get/set via `setBallhgss()` |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `checksum` | `number` | get/set via `setChecksum()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `eggLocationdp` | `number` | get/set via `setEggLocationdp()` |
| `eggLocationExtended` | `number` | get/set via `setEggLocationExtended()` |
| `getMarking(index: number)` | `boolean` |  |
| `groundTile` | `"None" \| "Sand" \| "Grass" \| "Puddle" \| "Rock" \| "Cave" \| "Snow" \| "Water" \| "Ice" \| "Building" \| "Marsh" \| "Bridge" \| "Elite4_1" \| "Max_DP" \| "Elite4_2" \| "Elite4_3" \| "Elite4_4" \| "Elite4_M" \| "DistortionSideways" \| "BattleTower" \| "BattleFactory" \| "BattleArcade" \| "BattleCastle" \| "BattleHall" \| "Distortion" \| "Max_Pt"` | get/set via `setGroundTile()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `markingCircle` | `boolean` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `boolean` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `boolean` | get/set via `setMarkingHeart()` |
| `markingSquare` | `boolean` | get/set via `setMarkingSquare()` |
| `markingStar` | `boolean` | get/set via `setMarkingStar()` |
| `markingTriangle` | `boolean` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `metLocationdp` | `number` | get/set via `setMetLocationdp()` |
| `metLocationExtended` | `number` | get/set via `setMetLocationExtended()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `possiblyPalParkdp` | `boolean` | get-only |
| `possiblyPalParkhgss` | `boolean` | get-only |
| `possiblyPalParkPt` | `boolean` | get-only |
| `rib34` | `boolean` | get/set via `setRib34()` |
| `rib35` | `boolean` | get/set via `setRib35()` |
| `rib36` | `boolean` | get/set via `setRib36()` |
| `rib37` | `boolean` | get/set via `setRib37()` |
| `riba4` | `boolean` | get/set via `setRiba4()` |
| `riba5` | `boolean` | get/set via `setRiba5()` |
| `riba6` | `boolean` | get/set via `setRiba6()` |
| `riba7` | `boolean` | get/set via `setRiba7()` |
| `ribb0` | `boolean` | get/set via `setRibb0()` |
| `ribb1` | `boolean` | get/set via `setRibb1()` |
| `ribb2` | `boolean` | get/set via `setRibb2()` |
| `ribb3` | `boolean` | get/set via `setRibb3()` |
| `ribb4` | `boolean` | get/set via `setRibb4()` |
| `ribb5` | `boolean` | get/set via `setRibb5()` |
| `ribb6` | `boolean` | get/set via `setRibb6()` |
| `ribb7` | `boolean` | get/set via `setRibb7()` |
| `ribbonAbility` | `boolean` | get/set via `setRibbonAbility()` |
| `ribbonAbilityDouble` | `boolean` | get/set via `setRibbonAbilityDouble()` |
| `ribbonAbilityGreat` | `boolean` | get/set via `setRibbonAbilityGreat()` |
| `ribbonAbilityMulti` | `boolean` | get/set via `setRibbonAbilityMulti()` |
| `ribbonAbilityPair` | `boolean` | get/set via `setRibbonAbilityPair()` |
| `ribbonAbilityWorld` | `boolean` | get/set via `setRibbonAbilityWorld()` |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbong3Beauty` | `boolean` | get/set via `setRibbong3Beauty()` |
| `ribbong3BeautyHyper` | `boolean` | get/set via `setRibbong3BeautyHyper()` |
| `ribbong3BeautyMaster` | `boolean` | get/set via `setRibbong3BeautyMaster()` |
| `ribbong3BeautySuper` | `boolean` | get/set via `setRibbong3BeautySuper()` |
| `ribbong3Cool` | `boolean` | get/set via `setRibbong3Cool()` |
| `ribbong3CoolHyper` | `boolean` | get/set via `setRibbong3CoolHyper()` |
| `ribbong3CoolMaster` | `boolean` | get/set via `setRibbong3CoolMaster()` |
| `ribbong3CoolSuper` | `boolean` | get/set via `setRibbong3CoolSuper()` |
| `ribbong3Cute` | `boolean` | get/set via `setRibbong3Cute()` |
| `ribbong3CuteHyper` | `boolean` | get/set via `setRibbong3CuteHyper()` |
| `ribbong3CuteMaster` | `boolean` | get/set via `setRibbong3CuteMaster()` |
| `ribbong3CuteSuper` | `boolean` | get/set via `setRibbong3CuteSuper()` |
| `ribbong3Smart` | `boolean` | get/set via `setRibbong3Smart()` |
| `ribbong3SmartHyper` | `boolean` | get/set via `setRibbong3SmartHyper()` |
| `ribbong3SmartMaster` | `boolean` | get/set via `setRibbong3SmartMaster()` |
| `ribbong3SmartSuper` | `boolean` | get/set via `setRibbong3SmartSuper()` |
| `ribbong3Tough` | `boolean` | get/set via `setRibbong3Tough()` |
| `ribbong3ToughHyper` | `boolean` | get/set via `setRibbong3ToughHyper()` |
| `ribbong3ToughMaster` | `boolean` | get/set via `setRibbong3ToughMaster()` |
| `ribbong3ToughSuper` | `boolean` | get/set via `setRibbong3ToughSuper()` |
| `ribbong4Beauty` | `boolean` | get/set via `setRibbong4Beauty()` |
| `ribbong4BeautyGreat` | `boolean` | get/set via `setRibbong4BeautyGreat()` |
| `ribbong4BeautyMaster` | `boolean` | get/set via `setRibbong4BeautyMaster()` |
| `ribbong4BeautyUltra` | `boolean` | get/set via `setRibbong4BeautyUltra()` |
| `ribbong4Cool` | `boolean` | get/set via `setRibbong4Cool()` |
| `ribbong4CoolGreat` | `boolean` | get/set via `setRibbong4CoolGreat()` |
| `ribbong4CoolMaster` | `boolean` | get/set via `setRibbong4CoolMaster()` |
| `ribbong4CoolUltra` | `boolean` | get/set via `setRibbong4CoolUltra()` |
| `ribbong4Cute` | `boolean` | get/set via `setRibbong4Cute()` |
| `ribbong4CuteGreat` | `boolean` | get/set via `setRibbong4CuteGreat()` |
| `ribbong4CuteMaster` | `boolean` | get/set via `setRibbong4CuteMaster()` |
| `ribbong4CuteUltra` | `boolean` | get/set via `setRibbong4CuteUltra()` |
| `ribbong4Smart` | `boolean` | get/set via `setRibbong4Smart()` |
| `ribbong4SmartGreat` | `boolean` | get/set via `setRibbong4SmartGreat()` |
| `ribbong4SmartMaster` | `boolean` | get/set via `setRibbong4SmartMaster()` |
| `ribbong4SmartUltra` | `boolean` | get/set via `setRibbong4SmartUltra()` |
| `ribbong4Tough` | `boolean` | get/set via `setRibbong4Tough()` |
| `ribbong4ToughGreat` | `boolean` | get/set via `setRibbong4ToughGreat()` |
| `ribbong4ToughMaster` | `boolean` | get/set via `setRibbong4ToughMaster()` |
| `ribbong4ToughUltra` | `boolean` | get/set via `setRibbong4ToughUltra()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonVictory` | `boolean` | get/set via `setRibbonVictory()` |
| `ribbonWinning` | `boolean` | get/set via `setRibbonWinning()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `setMarking(index: number, value: boolean)` | `void` |  |
| `shinyLeaf` | `number` | get/set via `setShinyLeaf()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |
| `walkingMood` | `number` | get/set via `setWalkingMood()` |

### `G6PKM`

*kind: abstract · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `checksum` | `number` | get/set via `setChecksum()` |
| `fixRelearn()` | `void` |  |
| `iv32` | `number` | get/set via `setIv32()` |
| `oppositeFriendship` | `number` | get/set via `setOppositeFriendship()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |

### `G8PKM`

*kind: abstract · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `affixedRibbon` | `number` | get/set via `setAffixedRibbon()` |
| `battleVersion` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setBattleVersion()` |
| `canGigantamax` | `boolean` | get/set via `setCanGigantamax()` |
| `checksum` | `number` | get/set via `setChecksum()` |
| `clearMoveRecordFlags()` | `void` |  |
| `clearPokeJobFlags()` | `void` |  |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `dynamaxLevel` | `number` | get/set via `setDynamaxLevel()` |
| `enjoyment` | `number` | get/set via `setEnjoyment()` |
| `fixRelearn()` | `void` |  |
| `flag2` | `boolean` | get/set via `setFlag2()` |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `fullness` | `number` | get/set via `setFullness()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `getMoveRecordFlag(index: number)` | `boolean` |  |
| `getMoveRecordFlagAny()` | `boolean` |  |
| `getPokeJobFlag(index: number)` | `boolean` |  |
| `getPokeJobFlagAny()` | `boolean` |  |
| `getRibbon(index: number)` | `boolean` |  |
| `getRibbonByte(index: number)` | `number` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerid` | `number` | get/set via `setHandlingTrainerid()` |
| `handlingTrainerLanguage` | `number` | get/set via `setHandlingTrainerLanguage()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `hasMarkEncounter8` | `boolean` | get-only |
| `hasMarkEncounter9` | `boolean` | get-only |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `isFavorite` | `boolean` | get/set via `setIsFavorite()` |
| `markCount` | `number` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `palma` | `number` | get/set via `setPalma()` |
| `permit` | `IPermitRecord` | get-only |
| `pokeJob` | `Uint8Array` | get-only |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib457` | `boolean` | get/set via `setRib457()` |
| `rib460` | `boolean` | get/set via `setRib460()` |
| `rib461` | `boolean` | get/set via `setRib461()` |
| `rib462` | `boolean` | get/set via `setRib462()` |
| `rib463` | `boolean` | get/set via `setRib463()` |
| `rib464` | `boolean` | get/set via `setRib464()` |
| `rib465` | `boolean` | get/set via `setRib465()` |
| `rib466` | `boolean` | get/set via `setRib466()` |
| `rib467` | `boolean` | get/set via `setRib467()` |
| `rib470` | `boolean` | get/set via `setRib470()` |
| `rib471` | `boolean` | get/set via `setRib471()` |
| `rib472` | `boolean` | get/set via `setRib472()` |
| `rib473` | `boolean` | get/set via `setRib473()` |
| `rib474` | `boolean` | get/set via `setRib474()` |
| `rib475` | `boolean` | get/set via `setRib475()` |
| `rib476` | `boolean` | get/set via `setRib476()` |
| `rib477` | `boolean` | get/set via `setRib477()` |
| `recordFlags` | `Uint8Array` | get-only |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionGalar` | `boolean` | get/set via `setRibbonChampionGalar()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionPaldea` | `boolean` | get/set via `setRibbonChampionPaldea()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonHisui` | `boolean` | get/set via `setRibbonHisui()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMarkAbsentMinded` | `boolean` | get/set via `setRibbonMarkAbsentMinded()` |
| `ribbonMarkAlpha` | `boolean` | get/set via `setRibbonMarkAlpha()` |
| `ribbonMarkAngry` | `boolean` | get/set via `setRibbonMarkAngry()` |
| `ribbonMarkBlizzard` | `boolean` | get/set via `setRibbonMarkBlizzard()` |
| `ribbonMarkCalmness` | `boolean` | get/set via `setRibbonMarkCalmness()` |
| `ribbonMarkCharismatic` | `boolean` | get/set via `setRibbonMarkCharismatic()` |
| `ribbonMarkCloudy` | `boolean` | get/set via `setRibbonMarkCloudy()` |
| `ribbonMarkCount` | `number` | get-only |
| `ribbonMarkCrafty` | `boolean` | get/set via `setRibbonMarkCrafty()` |
| `ribbonMarkCurry` | `boolean` | get/set via `setRibbonMarkCurry()` |
| `ribbonMarkDawn` | `boolean` | get/set via `setRibbonMarkDawn()` |
| `ribbonMarkDestiny` | `boolean` | get/set via `setRibbonMarkDestiny()` |
| `ribbonMarkDry` | `boolean` | get/set via `setRibbonMarkDry()` |
| `ribbonMarkDusk` | `boolean` | get/set via `setRibbonMarkDusk()` |
| `ribbonMarkExcited` | `boolean` | get/set via `setRibbonMarkExcited()` |
| `ribbonMarkFerocious` | `boolean` | get/set via `setRibbonMarkFerocious()` |
| `ribbonMarkFishing` | `boolean` | get/set via `setRibbonMarkFishing()` |
| `ribbonMarkFlustered` | `boolean` | get/set via `setRibbonMarkFlustered()` |
| `ribbonMarkGourmand` | `boolean` | get/set via `setRibbonMarkGourmand()` |
| `ribbonMarkHumble` | `boolean` | get/set via `setRibbonMarkHumble()` |
| `ribbonMarkIntellectual` | `boolean` | get/set via `setRibbonMarkIntellectual()` |
| `ribbonMarkIntense` | `boolean` | get/set via `setRibbonMarkIntense()` |
| `ribbonMarkItemfinder` | `boolean` | get/set via `setRibbonMarkItemfinder()` |
| `ribbonMarkJittery` | `boolean` | get/set via `setRibbonMarkJittery()` |
| `ribbonMarkJoyful` | `boolean` | get/set via `setRibbonMarkJoyful()` |
| `ribbonMarkJumbo` | `boolean` | get/set via `setRibbonMarkJumbo()` |
| `ribbonMarkKindly` | `boolean` | get/set via `setRibbonMarkKindly()` |
| `ribbonMarkLunchtime` | `boolean` | get/set via `setRibbonMarkLunchtime()` |
| `ribbonMarkMightiest` | `boolean` | get/set via `setRibbonMarkMightiest()` |
| `ribbonMarkMini` | `boolean` | get/set via `setRibbonMarkMini()` |
| `ribbonMarkMisty` | `boolean` | get/set via `setRibbonMarkMisty()` |
| `ribbonMarkPartner` | `boolean` | get/set via `setRibbonMarkPartner()` |
| `ribbonMarkPeeved` | `boolean` | get/set via `setRibbonMarkPeeved()` |
| `ribbonMarkPrideful` | `boolean` | get/set via `setRibbonMarkPrideful()` |
| `ribbonMarkPumpedUp` | `boolean` | get/set via `setRibbonMarkPumpedUp()` |
| `ribbonMarkRainy` | `boolean` | get/set via `setRibbonMarkRainy()` |
| `ribbonMarkRare` | `boolean` | get/set via `setRibbonMarkRare()` |
| `ribbonMarkRowdy` | `boolean` | get/set via `setRibbonMarkRowdy()` |
| `ribbonMarkSandstorm` | `boolean` | get/set via `setRibbonMarkSandstorm()` |
| `ribbonMarkScowling` | `boolean` | get/set via `setRibbonMarkScowling()` |
| `ribbonMarkSleepyTime` | `boolean` | get/set via `setRibbonMarkSleepyTime()` |
| `ribbonMarkSlump` | `boolean` | get/set via `setRibbonMarkSlump()` |
| `ribbonMarkSmiley` | `boolean` | get/set via `setRibbonMarkSmiley()` |
| `ribbonMarkSnowy` | `boolean` | get/set via `setRibbonMarkSnowy()` |
| `ribbonMarkStormy` | `boolean` | get/set via `setRibbonMarkStormy()` |
| `ribbonMarkTeary` | `boolean` | get/set via `setRibbonMarkTeary()` |
| `ribbonMarkThorny` | `boolean` | get/set via `setRibbonMarkThorny()` |
| `ribbonMarkTitan` | `boolean` | get/set via `setRibbonMarkTitan()` |
| `ribbonMarkUncommon` | `boolean` | get/set via `setRibbonMarkUncommon()` |
| `ribbonMarkUnsure` | `boolean` | get/set via `setRibbonMarkUnsure()` |
| `ribbonMarkUpbeat` | `boolean` | get/set via `setRibbonMarkUpbeat()` |
| `ribbonMarkVigor` | `boolean` | get/set via `setRibbonMarkVigor()` |
| `ribbonMarkZeroEnergy` | `boolean` | get/set via `setRibbonMarkZeroEnergy()` |
| `ribbonMarkZonedOut` | `boolean` | get/set via `setRibbonMarkZonedOut()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterRank` | `boolean` | get/set via `setRibbonMasterRank()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonOnceInAlifetime` | `boolean` | get/set via `setRibbonOnceInAlifetime()` |
| `ribbonPartner` | `boolean` | get/set via `setRibbonPartner()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTowerMaster` | `boolean` | get/set via `setRibbonTowerMaster()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonTwinklingStar` | `boolean` | get/set via `setRibbonTwinklingStar()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `setMoveRecordFlag(index: number, value: boolean)` | `void` |  |
| `setPokeJobFlag(index: number, value: boolean)` | `void` |  |
| `setRibbon(index: number, value: boolean)` | `void` |  |
| `sociability` | `number` | get/set via `setSociability()` |
| `tracker` | `bigint` | get/set via `setTracker()` |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

### `GBPKM`

*kind: abstract · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `dv16` | `number` | get/set via `setDv16()` |
| `evSpc` | `number` | get/set via `setEvSpc()` |
| `guessedLanguage(fallback: number)` | `number` |  |
| `ivSpc` | `number` | get/set via `setIvSpc()` |
| `isSpeciesNameMatch(language: number)` | `boolean` |  |
| `maxEvs()` | `void` |  |
| `setNotNicknamed()` | `void` |  |
| `setNotNicknamed(language: number)` | `void` |  |
| `setSqrtEvs(evs: readonly number[])` | `void` |  |

### `GBPKML`

*kind: abstract · extends `PKM`.*

### `IDaycareEggState`

*kind: interface.*

| Member | Type | Description |
| --- | --- | --- |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |

### `IDaycareExperience`

*kind: interface.*

| Member | Type | Description |
| --- | --- | --- |
| `getDaycareexp(index: number)` | `number` |  |
| `setDaycareexp(index: number, value: number)` | `void` |  |

### `IDaycareMulti`

*kind: interface.*

| Member | Type | Description |
| --- | --- | --- |
| `daycareCount` | `number` | get-only |

### `IDaycareRandomState<T>`

*kind: interface.*

| Member | Type | Description |
| --- | --- | --- |
| `seed` | `T` | get/set via `setSeed()` |

### `IDaycareStorage`

*kind: interface.*

| Member | Type | Description |
| --- | --- | --- |
| `daycareSlotCount` | `number` | get-only |
| `getDaycareSlot(index: number)` | `Uint8Array` |  |
| `isDaycareOccupied(index: number)` | `boolean` |  |
| `setDaycareOccupied(index: number, occupied: boolean)` | `void` |  |

### `InventoryPouch`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `canContain(itemID: number)` | `boolean` |  |
| `clearCount0()` | `void` | Clears all item slots with a quantity of zero and shifts any subsequent item slot up. |
| `count` | `number` | get-only — Count of item slots occupied in the pouch. |
| `findIndexFirstEmptySlot()` | `number` |  |
| `getAllItems()` | `readonly number[]` |  |
| `getEmpty(itemID: number, count: number)` | `InventoryItem` |  |
| `getPouch(data: Uint8Array)` | `void` |  |
| `giveAllItems(bag: PlayerBag, count: number)` | `void` |  |
| `giveAllItems(bag: PlayerBag, newItems: readonly number[], count: number)` | `void` |  |
| `giveItem(bag: PlayerBag, itemID: number, count: number)` | `number` |  |
| `hasItem(itemID: number)` | `boolean` |  |
| `isCramped` | `boolean` | get-only — Checks if the player may run out of bag space when there are too many unique items to fit into the pouch. |
| `items` | `readonly InventoryItem[]` | get-only |
| `maxCount` | `number` | get/set via `setMaxCount()` — Max quantity for a given item that can be stored in the pouch. |
| `modifyAllCount(value: number, modifyCriteria: (arg0: InventoryItem, arg1: number) => boolean)` | `void` |  |
| `modifyAllCount(bag: PlayerBag, count: number)` | `void` |  |
| `modifyAllCount(value: number, modifyCriteria: (arg0: InventoryItem) => boolean)` | `void` |  |
| `modifyAllCount(value: number)` | `void` |  |
| `removeAll()` | `void` | Clears all items in the pouch. |
| `removeAll(deleteCriteria: (arg0: InventoryItem) => boolean)` | `void` | Clears all items in the pouch. |
| `removeAll(deleteCriteria: (arg0: InventoryItem, arg1: number) => boolean)` | `void` | Clears all items in the pouch. |
| `sanitize(maxItemID: number, HaX: boolean)` | `void` |  |
| `setPouch(data: Uint8Array)` | `void` |  |
| `sortBy(selector: (arg0: TItem) => TCompare)` | `void` |  |
| `sortByCount(reverse: boolean)` | `void` |  |
| `sortByEmpty()` | `void` |  |
| `sortByIndex(reverse: boolean)` | `void` |  |
| `sortByName(names: readonly string[], reverse: boolean)` | `void` |  |
| `type` | `"None" \| "Items" \| "KeyItems" \| "TMHMs" \| "Medicine" \| "Berries" \| "Balls" \| "BattleItems" \| "MailItems" \| "PCItems" \| "FreeSpace" \| "ZCrystals" \| "Candy" \| "Treasure" \| "Ingredients" \| "MegaStones"` | get/set via `setType()` |

### `InventoryPouch3`

*kind: class · extends `InventoryPouch`.*

### `InventoryPouch3GC`

*kind: class · extends `InventoryPouch`.*

### `InventoryPouch4`

*kind: class · extends `InventoryPouch`.*

### `InventoryPouch7`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `setNew` | `boolean` | get/set via `setSetNew()` |

### `InventoryPouch7b`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `setNew` | `boolean` | get/set via `setSetNew()` |

### `InventoryPouch8`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `setNew` | `boolean` | get/set via `setSetNew()` |

### `InventoryPouch8a`

*kind: class · extends `InventoryPouch`.*

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getItem(data: Uint8Array, ofs: number)` | `InventoryItem8a` |  |

### `InventoryPouch8b`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `setNew` | `boolean` | get/set via `setSetNew()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `clearItem(data: Uint8Array, index: number)` | `void` |  |
| `getItemOffset(index: number)` | `number` |  |
| `readItem(data: Uint8Array, itemID: number)` | `InventoryItem8b` |  |

### `InventoryPouch9`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `pouchIndex` | `number` | get/set via `setPouchIndex()` |
| `setNew` | `boolean` | get/set via `setSetNew()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getItemOffset(index: number)` | `number` |  |
| `getItemSpan(block: Uint8Array, index: number)` | `Uint8Array` |  |
| `readItem(block: Uint8Array, itemID: number)` | `InventoryItem9` |  |
| `setQuantityZero(block: Uint8Array, index: number)` | `void` |  |

### `InventoryPouch9a`

*kind: class · extends `InventoryPouch`.*

| Member | Type | Description |
| --- | --- | --- |
| `pouchIndex` | `number` | get/set via `setPouchIndex()` |
| `setNew` | `boolean` | get/set via `setSetNew()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getItemOffset(index: number)` | `number` |  |
| `getItemSpan(block: Uint8Array, index: number)` | `Uint8Array` |  |
| `readItem(block: Uint8Array, itemID: number)` | `InventoryItem9a` |  |
| `setQuantityZero(block: Uint8Array, index: number)` | `void` |  |

### `InventoryPouchGB`

*kind: class · extends `InventoryPouch`.*

### `PA8`

*kind: class · context: Gen8a · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `affixedRibbon` | `number` | get/set via `setAffixedRibbon()` |
| `alphaMove` | `number` | get/set via `setAlphaMove()` |
| `battleVersion` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setBattleVersion()` |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `calcHeightAbsolute` | `number` | get-only |
| `calcWeightAbsolute` | `number` | get-only |
| `canGigantamax` | `boolean` | get/set via `setCanGigantamax()` |
| `checksum` | `number` | get/set via `setChecksum()` |
| `clearMoveRecordFlags()` | `void` |  |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `dynamaxLevel` | `number` | get/set via `setDynamaxLevel()` |
| `enjoyment` | `number` | get/set via `setEnjoyment()` |
| `fixMemories()` | `void` |  |
| `fixRelearn()` | `void` |  |
| `flag2` | `boolean` | get/set via `setFlag2()` |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `fullness` | `number` | get/set via `setFullness()` |
| `gvAtk` | `number` | get/set via `setGvAtk()` |
| `gvDef` | `number` | get/set via `setGvDef()` |
| `gvHp` | `number` | get/set via `setGvHp()` |
| `gvSpa` | `number` | get/set via `setGvSpa()` |
| `gvSpd` | `number` | get/set via `setGvSpd()` |
| `gvSpe` | `number` | get/set via `setGvSpe()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `getMasteredRecordFlag(index: number)` | `boolean` |  |
| `getMasteredRecordFlagAny()` | `boolean` |  |
| `getMoveRecordFlag(index: number)` | `boolean` |  |
| `getMoveRecordFlagAny()` | `boolean` |  |
| `getPurchasedCount()` | `number` |  |
| `getPurchasedRecordFlag(index: number)` | `boolean` |  |
| `getPurchasedRecordFlagAny()` | `boolean` |  |
| `getRibbon(index: number)` | `boolean` |  |
| `getRibbonByte(index: number)` | `number` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerid` | `number` | get/set via `setHandlingTrainerid()` |
| `handlingTrainerLanguage` | `number` | get/set via `setHandlingTrainerLanguage()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `hasMarkEncounter8` | `boolean` | get-only |
| `hasMarkEncounter9` | `boolean` | get-only |
| `heightAbsolute` | `number` | get/set via `setHeightAbsolute()` |
| `heightRatio` | `number` | get-only |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `isAlpha` | `boolean` | get/set via `setIsAlpha()` |
| `isFavorite` | `boolean` | get/set via `setIsFavorite()` |
| `isNoble` | `boolean` | get/set via `setIsNoble()` |
| `markCount` | `number` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `masteredRecord` | `Uint8Array` | get-only |
| `moveRecordFlags` | `Uint8Array` | get-only |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `permit` | `IPermitRecord` | get-only |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `purchasedRecord` | `Uint8Array` | get-only |
| `rib457` | `boolean` | get/set via `setRib457()` |
| `rib460` | `boolean` | get/set via `setRib460()` |
| `rib461` | `boolean` | get/set via `setRib461()` |
| `rib462` | `boolean` | get/set via `setRib462()` |
| `rib463` | `boolean` | get/set via `setRib463()` |
| `rib464` | `boolean` | get/set via `setRib464()` |
| `rib465` | `boolean` | get/set via `setRib465()` |
| `rib466` | `boolean` | get/set via `setRib466()` |
| `rib467` | `boolean` | get/set via `setRib467()` |
| `rib470` | `boolean` | get/set via `setRib470()` |
| `rib471` | `boolean` | get/set via `setRib471()` |
| `rib472` | `boolean` | get/set via `setRib472()` |
| `rib473` | `boolean` | get/set via `setRib473()` |
| `rib474` | `boolean` | get/set via `setRib474()` |
| `rib475` | `boolean` | get/set via `setRib475()` |
| `rib476` | `boolean` | get/set via `setRib476()` |
| `rib477` | `boolean` | get/set via `setRib477()` |
| `resetHeight()` | `void` |  |
| `resetWeight()` | `void` |  |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionGalar` | `boolean` | get/set via `setRibbonChampionGalar()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionPaldea` | `boolean` | get/set via `setRibbonChampionPaldea()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonHisui` | `boolean` | get/set via `setRibbonHisui()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMarkAbsentMinded` | `boolean` | get/set via `setRibbonMarkAbsentMinded()` |
| `ribbonMarkAlpha` | `boolean` | get/set via `setRibbonMarkAlpha()` |
| `ribbonMarkAngry` | `boolean` | get/set via `setRibbonMarkAngry()` |
| `ribbonMarkBlizzard` | `boolean` | get/set via `setRibbonMarkBlizzard()` |
| `ribbonMarkCalmness` | `boolean` | get/set via `setRibbonMarkCalmness()` |
| `ribbonMarkCharismatic` | `boolean` | get/set via `setRibbonMarkCharismatic()` |
| `ribbonMarkCloudy` | `boolean` | get/set via `setRibbonMarkCloudy()` |
| `ribbonMarkCount` | `number` | get-only |
| `ribbonMarkCrafty` | `boolean` | get/set via `setRibbonMarkCrafty()` |
| `ribbonMarkCurry` | `boolean` | get/set via `setRibbonMarkCurry()` |
| `ribbonMarkDawn` | `boolean` | get/set via `setRibbonMarkDawn()` |
| `ribbonMarkDestiny` | `boolean` | get/set via `setRibbonMarkDestiny()` |
| `ribbonMarkDry` | `boolean` | get/set via `setRibbonMarkDry()` |
| `ribbonMarkDusk` | `boolean` | get/set via `setRibbonMarkDusk()` |
| `ribbonMarkExcited` | `boolean` | get/set via `setRibbonMarkExcited()` |
| `ribbonMarkFerocious` | `boolean` | get/set via `setRibbonMarkFerocious()` |
| `ribbonMarkFishing` | `boolean` | get/set via `setRibbonMarkFishing()` |
| `ribbonMarkFlustered` | `boolean` | get/set via `setRibbonMarkFlustered()` |
| `ribbonMarkGourmand` | `boolean` | get/set via `setRibbonMarkGourmand()` |
| `ribbonMarkHumble` | `boolean` | get/set via `setRibbonMarkHumble()` |
| `ribbonMarkIntellectual` | `boolean` | get/set via `setRibbonMarkIntellectual()` |
| `ribbonMarkIntense` | `boolean` | get/set via `setRibbonMarkIntense()` |
| `ribbonMarkItemfinder` | `boolean` | get/set via `setRibbonMarkItemfinder()` |
| `ribbonMarkJittery` | `boolean` | get/set via `setRibbonMarkJittery()` |
| `ribbonMarkJoyful` | `boolean` | get/set via `setRibbonMarkJoyful()` |
| `ribbonMarkJumbo` | `boolean` | get/set via `setRibbonMarkJumbo()` |
| `ribbonMarkKindly` | `boolean` | get/set via `setRibbonMarkKindly()` |
| `ribbonMarkLunchtime` | `boolean` | get/set via `setRibbonMarkLunchtime()` |
| `ribbonMarkMightiest` | `boolean` | get/set via `setRibbonMarkMightiest()` |
| `ribbonMarkMini` | `boolean` | get/set via `setRibbonMarkMini()` |
| `ribbonMarkMisty` | `boolean` | get/set via `setRibbonMarkMisty()` |
| `ribbonMarkPartner` | `boolean` | get/set via `setRibbonMarkPartner()` |
| `ribbonMarkPeeved` | `boolean` | get/set via `setRibbonMarkPeeved()` |
| `ribbonMarkPrideful` | `boolean` | get/set via `setRibbonMarkPrideful()` |
| `ribbonMarkPumpedUp` | `boolean` | get/set via `setRibbonMarkPumpedUp()` |
| `ribbonMarkRainy` | `boolean` | get/set via `setRibbonMarkRainy()` |
| `ribbonMarkRare` | `boolean` | get/set via `setRibbonMarkRare()` |
| `ribbonMarkRowdy` | `boolean` | get/set via `setRibbonMarkRowdy()` |
| `ribbonMarkSandstorm` | `boolean` | get/set via `setRibbonMarkSandstorm()` |
| `ribbonMarkScowling` | `boolean` | get/set via `setRibbonMarkScowling()` |
| `ribbonMarkSleepyTime` | `boolean` | get/set via `setRibbonMarkSleepyTime()` |
| `ribbonMarkSlump` | `boolean` | get/set via `setRibbonMarkSlump()` |
| `ribbonMarkSmiley` | `boolean` | get/set via `setRibbonMarkSmiley()` |
| `ribbonMarkSnowy` | `boolean` | get/set via `setRibbonMarkSnowy()` |
| `ribbonMarkStormy` | `boolean` | get/set via `setRibbonMarkStormy()` |
| `ribbonMarkTeary` | `boolean` | get/set via `setRibbonMarkTeary()` |
| `ribbonMarkThorny` | `boolean` | get/set via `setRibbonMarkThorny()` |
| `ribbonMarkTitan` | `boolean` | get/set via `setRibbonMarkTitan()` |
| `ribbonMarkUncommon` | `boolean` | get/set via `setRibbonMarkUncommon()` |
| `ribbonMarkUnsure` | `boolean` | get/set via `setRibbonMarkUnsure()` |
| `ribbonMarkUpbeat` | `boolean` | get/set via `setRibbonMarkUpbeat()` |
| `ribbonMarkVigor` | `boolean` | get/set via `setRibbonMarkVigor()` |
| `ribbonMarkZeroEnergy` | `boolean` | get/set via `setRibbonMarkZeroEnergy()` |
| `ribbonMarkZonedOut` | `boolean` | get/set via `setRibbonMarkZonedOut()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterRank` | `boolean` | get/set via `setRibbonMasterRank()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonOnceInAlifetime` | `boolean` | get/set via `setRibbonOnceInAlifetime()` |
| `ribbonPartner` | `boolean` | get/set via `setRibbonPartner()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTowerMaster` | `boolean` | get/set via `setRibbonTowerMaster()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonTwinklingStar` | `boolean` | get/set via `setRibbonTwinklingStar()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `scale` | `number` | get/set via `setScale()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `setMasteredRecordFlag(index: number, value: boolean)` | `void` |  |
| `setMasteryFlagMove(move: number)` | `void` |  |
| `setMasteryFlags()` | `void` |  |
| `setMoveRecordFlag(index: number, value: boolean)` | `void` |  |
| `setPurchasedRecordFlag(index: number, value: boolean)` | `void` |  |
| `setRibbon(index: number, value: boolean)` | `void` |  |
| `sociability` | `number` | get/set via `setSociability()` |
| `tracker` | `bigint` | get/set via `setTracker()` |
| `unka0` | `number` | get/set via `setUnka0()` |
| `unkf3` | `number` | get/set via `setUnkf3()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |
| `weightAbsolute` | `number` | get/set via `setWeightAbsolute()` |
| `weightRatio` | `number` | get-only |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getGanbaruStat(baseStat: number, iv: number, gv: number, level: number)` | `number` |  |
| `getHeightAbsolute(p: IPersonalMisc, heightScalar: number)` | `number` |  |
| `getHeightScalar(height: number, avgHeight: number)` | `number` |  |
| `getStat(baseStat: number, level: number, nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random", statIndex: number)` | `number` |  |
| `getStatHp(baseStat: number, level: number)` | `number` |  |
| `getWeightAbsolute(p: IPersonalMisc, heightScalar: number, weightScalar: number)` | `number` |  |
| `getWeightScalar(height: number, weight: number, avgHeight: number, avgWeight: number)` | `number` |  |

### `PA9`

*kind: class · context: Gen9a · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `affixedRibbon` | `number` | get/set via `setAffixedRibbon()` |
| `battleVersion` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setBattleVersion()` |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `belongsToSkipVersion(tr: ITrainerInfo)` | `boolean` |  |
| `checksum` | `number` | get/set via `setChecksum()` |
| `clearMovePlusFlags()` | `void` |  |
| `clearMoveRecordFlags()` | `void` |  |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `fixMemories()` | `void` |  |
| `fixRelearn()` | `void` |  |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `getMovePlusFlag(index: number)` | `boolean` |  |
| `getMovePlusFlagAny()` | `boolean` |  |
| `getMovePlusFlagAnyImpossible()` | `boolean` |  |
| `getMoveRecordFlag(index: number)` | `boolean` |  |
| `getMoveRecordFlagAny()` | `boolean` |  |
| `getRibbon(index: number)` | `boolean` |  |
| `getRibbonByte(index: number)` | `number` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerid` | `number` | get/set via `setHandlingTrainerid()` |
| `handlingTrainerLanguage` | `number` | get/set via `setHandlingTrainerLanguage()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `hasMarkEncounter8` | `boolean` | get-only |
| `hasMarkEncounter9` | `boolean` | get-only |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `isAlpha` | `boolean` | get/set via `setIsAlpha()` |
| `isFavorite` | `boolean` | get/set via `setIsFavorite()` |
| `isUnhatchedEgg` | `boolean` | get-only |
| `levelBoost` | `number` | get/set via `setLevelBoost()` |
| `markCount` | `number` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `obedienceLevel` | `number` | get/set via `setObedienceLevel()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `permit` | `IPermitRecord` | get-only |
| `plusFlags0` | `Uint8Array` | get-only |
| `plusFlags1` | `Uint8Array` | get-only |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib457` | `boolean` | get/set via `setRib457()` |
| `rib460` | `boolean` | get/set via `setRib460()` |
| `rib461` | `boolean` | get/set via `setRib461()` |
| `rib462` | `boolean` | get/set via `setRib462()` |
| `rib463` | `boolean` | get/set via `setRib463()` |
| `rib464` | `boolean` | get/set via `setRib464()` |
| `rib465` | `boolean` | get/set via `setRib465()` |
| `rib466` | `boolean` | get/set via `setRib466()` |
| `rib467` | `boolean` | get/set via `setRib467()` |
| `rib470` | `boolean` | get/set via `setRib470()` |
| `rib471` | `boolean` | get/set via `setRib471()` |
| `rib472` | `boolean` | get/set via `setRib472()` |
| `rib473` | `boolean` | get/set via `setRib473()` |
| `rib474` | `boolean` | get/set via `setRib474()` |
| `rib475` | `boolean` | get/set via `setRib475()` |
| `rib476` | `boolean` | get/set via `setRib476()` |
| `rib477` | `boolean` | get/set via `setRib477()` |
| `recordFlagsBase` | `Uint8Array` | get-only |
| `recordFlagsdlc` | `Uint8Array` | get-only |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionGalar` | `boolean` | get/set via `setRibbonChampionGalar()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionPaldea` | `boolean` | get/set via `setRibbonChampionPaldea()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonHisui` | `boolean` | get/set via `setRibbonHisui()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMarkAbsentMinded` | `boolean` | get/set via `setRibbonMarkAbsentMinded()` |
| `ribbonMarkAlpha` | `boolean` | get/set via `setRibbonMarkAlpha()` |
| `ribbonMarkAngry` | `boolean` | get/set via `setRibbonMarkAngry()` |
| `ribbonMarkBlizzard` | `boolean` | get/set via `setRibbonMarkBlizzard()` |
| `ribbonMarkCalmness` | `boolean` | get/set via `setRibbonMarkCalmness()` |
| `ribbonMarkCharismatic` | `boolean` | get/set via `setRibbonMarkCharismatic()` |
| `ribbonMarkCloudy` | `boolean` | get/set via `setRibbonMarkCloudy()` |
| `ribbonMarkCount` | `number` | get-only |
| `ribbonMarkCrafty` | `boolean` | get/set via `setRibbonMarkCrafty()` |
| `ribbonMarkCurry` | `boolean` | get/set via `setRibbonMarkCurry()` |
| `ribbonMarkDawn` | `boolean` | get/set via `setRibbonMarkDawn()` |
| `ribbonMarkDestiny` | `boolean` | get/set via `setRibbonMarkDestiny()` |
| `ribbonMarkDry` | `boolean` | get/set via `setRibbonMarkDry()` |
| `ribbonMarkDusk` | `boolean` | get/set via `setRibbonMarkDusk()` |
| `ribbonMarkExcited` | `boolean` | get/set via `setRibbonMarkExcited()` |
| `ribbonMarkFerocious` | `boolean` | get/set via `setRibbonMarkFerocious()` |
| `ribbonMarkFishing` | `boolean` | get/set via `setRibbonMarkFishing()` |
| `ribbonMarkFlustered` | `boolean` | get/set via `setRibbonMarkFlustered()` |
| `ribbonMarkGourmand` | `boolean` | get/set via `setRibbonMarkGourmand()` |
| `ribbonMarkHumble` | `boolean` | get/set via `setRibbonMarkHumble()` |
| `ribbonMarkIntellectual` | `boolean` | get/set via `setRibbonMarkIntellectual()` |
| `ribbonMarkIntense` | `boolean` | get/set via `setRibbonMarkIntense()` |
| `ribbonMarkItemfinder` | `boolean` | get/set via `setRibbonMarkItemfinder()` |
| `ribbonMarkJittery` | `boolean` | get/set via `setRibbonMarkJittery()` |
| `ribbonMarkJoyful` | `boolean` | get/set via `setRibbonMarkJoyful()` |
| `ribbonMarkJumbo` | `boolean` | get/set via `setRibbonMarkJumbo()` |
| `ribbonMarkKindly` | `boolean` | get/set via `setRibbonMarkKindly()` |
| `ribbonMarkLunchtime` | `boolean` | get/set via `setRibbonMarkLunchtime()` |
| `ribbonMarkMightiest` | `boolean` | get/set via `setRibbonMarkMightiest()` |
| `ribbonMarkMini` | `boolean` | get/set via `setRibbonMarkMini()` |
| `ribbonMarkMisty` | `boolean` | get/set via `setRibbonMarkMisty()` |
| `ribbonMarkPartner` | `boolean` | get/set via `setRibbonMarkPartner()` |
| `ribbonMarkPeeved` | `boolean` | get/set via `setRibbonMarkPeeved()` |
| `ribbonMarkPrideful` | `boolean` | get/set via `setRibbonMarkPrideful()` |
| `ribbonMarkPumpedUp` | `boolean` | get/set via `setRibbonMarkPumpedUp()` |
| `ribbonMarkRainy` | `boolean` | get/set via `setRibbonMarkRainy()` |
| `ribbonMarkRare` | `boolean` | get/set via `setRibbonMarkRare()` |
| `ribbonMarkRowdy` | `boolean` | get/set via `setRibbonMarkRowdy()` |
| `ribbonMarkSandstorm` | `boolean` | get/set via `setRibbonMarkSandstorm()` |
| `ribbonMarkScowling` | `boolean` | get/set via `setRibbonMarkScowling()` |
| `ribbonMarkSleepyTime` | `boolean` | get/set via `setRibbonMarkSleepyTime()` |
| `ribbonMarkSlump` | `boolean` | get/set via `setRibbonMarkSlump()` |
| `ribbonMarkSmiley` | `boolean` | get/set via `setRibbonMarkSmiley()` |
| `ribbonMarkSnowy` | `boolean` | get/set via `setRibbonMarkSnowy()` |
| `ribbonMarkStormy` | `boolean` | get/set via `setRibbonMarkStormy()` |
| `ribbonMarkTeary` | `boolean` | get/set via `setRibbonMarkTeary()` |
| `ribbonMarkThorny` | `boolean` | get/set via `setRibbonMarkThorny()` |
| `ribbonMarkTitan` | `boolean` | get/set via `setRibbonMarkTitan()` |
| `ribbonMarkUncommon` | `boolean` | get/set via `setRibbonMarkUncommon()` |
| `ribbonMarkUnsure` | `boolean` | get/set via `setRibbonMarkUnsure()` |
| `ribbonMarkUpbeat` | `boolean` | get/set via `setRibbonMarkUpbeat()` |
| `ribbonMarkVigor` | `boolean` | get/set via `setRibbonMarkVigor()` |
| `ribbonMarkZeroEnergy` | `boolean` | get/set via `setRibbonMarkZeroEnergy()` |
| `ribbonMarkZonedOut` | `boolean` | get/set via `setRibbonMarkZonedOut()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterRank` | `boolean` | get/set via `setRibbonMasterRank()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonOnceInAlifetime` | `boolean` | get/set via `setRibbonOnceInAlifetime()` |
| `ribbonPartner` | `boolean` | get/set via `setRibbonPartner()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTowerMaster` | `boolean` | get/set via `setRibbonTowerMaster()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonTwinklingStar` | `boolean` | get/set via `setRibbonTwinklingStar()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `scale` | `number` | get/set via `setScale()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `setMovePlusFlag(index: number, value: boolean)` | `void` |  |
| `setMoveRecordFlag(index: number, value: boolean)` | `void` |  |
| `setRibbon(index: number, value: boolean)` | `void` |  |
| `speciesInternal` | `number` | get/set via `setSpeciesInternal()` |
| `tracker` | `bigint` | get/set via `setTracker()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

### `PB7`

*kind: class · context: Gen7b · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `avAtk` | `number` | get/set via `setAvAtk()` |
| `avDef` | `number` | get/set via `setAvDef()` |
| `avHp` | `number` | get/set via `setAvHp()` |
| `avSpa` | `number` | get/set via `setAvSpa()` |
| `avSpd` | `number` | get/set via `setAvSpd()` |
| `avSpe` | `number` | get/set via `setAvSpe()` |
| `awakecp` | `number` | get-only |
| `basecp` | `number` | get-only |
| `cpScalar` | `number` | get-only |
| `calccp` | `number` | get-only |
| `calcHeightAbsolute` | `number` | get-only |
| `calcWeightAbsolute` | `number` | get-only |
| `dirtLocation` | `number` | get/set via `setDirtLocation()` |
| `dirtType` | `number` | get/set via `setDirtType()` |
| `enjoyment` | `number` | get/set via `setEnjoyment()` |
| `fixMemories()` | `void` |  |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `fullness` | `number` | get/set via `setFullness()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htFeeling` | `number` | get/set via `setHtFeeling()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htIntensity` | `number` | get/set via `setHtIntensity()` |
| `htMemory` | `number` | get/set via `setHtMemory()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `htTextVar` | `number` | get/set via `setHtTextVar()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `heightAbsolute` | `number` | get/set via `setHeightAbsolute()` |
| `heightRatio` | `number` | get-only |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `isFavorite` | `boolean` | get/set via `setIsFavorite()` |
| `isStarter` | `boolean` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `mood` | `number` | get/set via `setMood()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib62` | `boolean` | get/set via `setRib62()` |
| `rib63` | `boolean` | get/set via `setRib63()` |
| `rib64` | `boolean` | get/set via `setRib64()` |
| `rib65` | `boolean` | get/set via `setRib65()` |
| `rib66` | `boolean` | get/set via `setRib66()` |
| `rib67` | `boolean` | get/set via `setRib67()` |
| `rank` | `number` | get/set via `setRank()` |
| `receivedDate` | `string \| null` | get/set via `setReceivedDate()` |
| `receivedDay` | `number` | get/set via `setReceivedDay()` |
| `receivedHour` | `number` | get/set via `setReceivedHour()` |
| `receivedMinute` | `number` | get/set via `setReceivedMinute()` |
| `receivedMonth` | `number` | get/set via `setReceivedMonth()` |
| `receivedSecond` | `number` | get/set via `setReceivedSecond()` |
| `receivedTime` | `string \| null` | get/set via `setReceivedTime()` |
| `receivedYear` | `number` | get/set via `setReceivedYear()` |
| `resetcp()` | `void` |  |
| `resetCalculatedValues()` | `void` |  |
| `resetHeight()` | `void` |  |
| `resetSpiritMood()` | `void` |  |
| `resetWeight()` | `void` |  |
| `resortEventStatus` | `"NONE" \| "SEIKAKU" \| "CARE" \| "LIKE_RESORT" \| "LIKE_BATTLE" \| "LIKE_ADV" \| "GOOD_FRIEND" \| "GIM" \| "HOTSPA" \| "WILD" \| "WILD_LOVE" \| "WILD_LIVE" \| "POKEMAME_GET1" \| "POKEMAME_GET2" \| "POKEMAME_GET3" \| "KINOMI_HELP" \| "PLAY_STATE" \| "HOTSPA_STATE" \| "HOTSPA_DIZZY" \| "HOTSPA_EGG_HATCHING" \| "MAX"` | get/set via `setResortEventStatus()` |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `spirit` | `number` | get/set via `setSpirit()` |
| `statCp` | `number` | get/set via `setStatCp()` |
| `statMega` | `boolean` | get/set via `setStatMega()` |
| `statMegaForm` | `number` | get/set via `setStatMegaForm()` |
| `weightAbsolute` | `number` | get/set via `setWeightAbsolute()` |
| `weightRatio` | `number` | get-only |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getHeightAbsolute(p: IPersonalMisc, heightScalar: number)` | `number` |  |
| `getHeightScalar(height: number, avgHeight: number)` | `number` |  |
| `getRandomIndex(bits: number, characterIndex: number, nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random")` | `number` |  |
| `getWeightAbsolute(p: IPersonalMisc, heightScalar: number, weightScalar: number)` | `number` |  |
| `getWeightScalar(height: number, weight: number, avgHeight: number, avgWeight: number)` | `number` |  |
| `initialSpiritMood` | `number` | get/set via `setInitialSpiritMood()` |

### `PB8`

*kind: class · context: Gen8b · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `fixMemories()` | `void` |  |
| `isDprIllegal` | `boolean` | get/set via `setIsDprIllegal()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |

### `PK1`

*kind: class · context: Gen1 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `catchRate` | `number` | get/set via `setCatchRate()` |
| `convertTopk2()` | `PK2` |  |
| `convertTopk7()` | `PK7` |  |
| `gen2Item` | `number` | get-only |
| `getSingleListChecksum()` | `number` | Gets a checksum over all the entity's data using a single list to wrap all components. |
| `setTypes(pi: T)` | `void` |  |
| `speciesInternal` | `number` | get/set via `setSpeciesInternal()` |
| `statLevelBox` | `number` | get/set via `setStatLevelBox()` |
| `statSpc` | `number` | get/set via `setStatSpc()` |
| `type1` | `number` | get/set via `setType1()` |
| `type2` | `number` | get/set via `setType2()` |

### `PK2`

*kind: class · context: Gen2 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `caughtData` | `number` | get/set via `setCaughtData()` |
| `convertTopk1()` | `PK1` |  |
| `convertTopk7()` | `PK7` |  |
| `convertTosk2()` | `SK2` |  |
| `getSingleListChecksum()` | `number` | Gets a checksum over all the entity's data using a single list to wrap all components. |
| `metTimeOfDay` | `number` | get/set via `setMetTimeOfDay()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `speciesInternal` | `number` | get/set via `setSpeciesInternal()` |

### `PK3`

*kind: class · context: Gen3 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `checksum` | `number` | get/set via `setChecksum()` |
| `convertTock3()` | `CK3` |  |
| `convertTopk4()` | `PK4` |  |
| `convertToxk3()` | `XK3` |  |
| `flagHasSpecies` | `boolean` | get/set via `setFlagHasSpecies()` |
| `flagIsBadEgg` | `boolean` | get/set via `setFlagIsBadEgg()` |
| `flagIsEgg` | `boolean` | get/set via `setFlagIsEgg()` |
| `getNicknamePrefillRegion()` | `Uint8Array` |  |
| `heldMailid` | `number` | get/set via `setHeldMailid()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `sanity` | `number` | get/set via `setSanity()` |

### `PK4`

*kind: class · context: Gen4 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `ballCapsuleIndex` | `number` | get/set via `setBallCapsuleIndex()` |
| `convertTobk4()` | `BK4` |  |
| `convertTopk5()` | `PK5` |  |
| `convertTork4()` | `RK4` |  |
| `heldMail` | `Uint8Array` | get-only |
| `seals` | `Uint8Array` | get-only |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `transferTrash(src: Uint8Array, dest: Uint8Array, language: number)` | `void` |  |

### `PK5`

*kind: class · context: Gen5 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `checksum` | `number` | get/set via `setChecksum()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `convertTopk6()` | `PK6` |  |
| `getMarking(index: number)` | `boolean` |  |
| `groundTile` | `"None" \| "Sand" \| "Grass" \| "Puddle" \| "Rock" \| "Cave" \| "Snow" \| "Water" \| "Ice" \| "Building" \| "Marsh" \| "Bridge" \| "Elite4_1" \| "Max_DP" \| "Elite4_2" \| "Elite4_3" \| "Elite4_4" \| "Elite4_M" \| "DistortionSideways" \| "BattleTower" \| "BattleFactory" \| "BattleArcade" \| "BattleCastle" \| "BattleHall" \| "Distortion" \| "Max_Pt"` | get/set via `setGroundTile()` |
| `heldMail` | `Uint8Array` | get-only |
| `hiddenAbility` | `boolean` | get/set via `setHiddenAbility()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `isPokeStar` | `boolean` | get/set via `setIsPokeStar()` |
| `junkByte` | `number` | get/set via `setJunkByte()` — , now unused. |
| `junkData` | `bigint` | get/set via `setJunkData()` |
| `markingCircle` | `boolean` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `boolean` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `boolean` | get/set via `setMarkingHeart()` |
| `markingSquare` | `boolean` | get/set via `setMarkingSquare()` |
| `markingStar` | `boolean` | get/set via `setMarkingStar()` |
| `markingTriangle` | `boolean` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `nsparkle` | `boolean` | get/set via `setNsparkle()` |
| `pokeStarFame` | `number` | get/set via `setPokeStarFame()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib34` | `boolean` | get/set via `setRib34()` |
| `rib35` | `boolean` | get/set via `setRib35()` |
| `rib36` | `boolean` | get/set via `setRib36()` |
| `rib37` | `boolean` | get/set via `setRib37()` |
| `riba4` | `boolean` | get/set via `setRiba4()` |
| `riba5` | `boolean` | get/set via `setRiba5()` |
| `riba6` | `boolean` | get/set via `setRiba6()` |
| `riba7` | `boolean` | get/set via `setRiba7()` |
| `ribb0` | `boolean` | get/set via `setRibb0()` |
| `ribb1` | `boolean` | get/set via `setRibb1()` |
| `ribb2` | `boolean` | get/set via `setRibb2()` |
| `ribb3` | `boolean` | get/set via `setRibb3()` |
| `ribb4` | `boolean` | get/set via `setRibb4()` |
| `ribb5` | `boolean` | get/set via `setRibb5()` |
| `ribb6` | `boolean` | get/set via `setRibb6()` |
| `ribb7` | `boolean` | get/set via `setRibb7()` |
| `ribbonAbility` | `boolean` | get/set via `setRibbonAbility()` |
| `ribbonAbilityDouble` | `boolean` | get/set via `setRibbonAbilityDouble()` |
| `ribbonAbilityGreat` | `boolean` | get/set via `setRibbonAbilityGreat()` |
| `ribbonAbilityMulti` | `boolean` | get/set via `setRibbonAbilityMulti()` |
| `ribbonAbilityPair` | `boolean` | get/set via `setRibbonAbilityPair()` |
| `ribbonAbilityWorld` | `boolean` | get/set via `setRibbonAbilityWorld()` |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbong3Beauty` | `boolean` | get/set via `setRibbong3Beauty()` |
| `ribbong3BeautyHyper` | `boolean` | get/set via `setRibbong3BeautyHyper()` |
| `ribbong3BeautyMaster` | `boolean` | get/set via `setRibbong3BeautyMaster()` |
| `ribbong3BeautySuper` | `boolean` | get/set via `setRibbong3BeautySuper()` |
| `ribbong3Cool` | `boolean` | get/set via `setRibbong3Cool()` |
| `ribbong3CoolHyper` | `boolean` | get/set via `setRibbong3CoolHyper()` |
| `ribbong3CoolMaster` | `boolean` | get/set via `setRibbong3CoolMaster()` |
| `ribbong3CoolSuper` | `boolean` | get/set via `setRibbong3CoolSuper()` |
| `ribbong3Cute` | `boolean` | get/set via `setRibbong3Cute()` |
| `ribbong3CuteHyper` | `boolean` | get/set via `setRibbong3CuteHyper()` |
| `ribbong3CuteMaster` | `boolean` | get/set via `setRibbong3CuteMaster()` |
| `ribbong3CuteSuper` | `boolean` | get/set via `setRibbong3CuteSuper()` |
| `ribbong3Smart` | `boolean` | get/set via `setRibbong3Smart()` |
| `ribbong3SmartHyper` | `boolean` | get/set via `setRibbong3SmartHyper()` |
| `ribbong3SmartMaster` | `boolean` | get/set via `setRibbong3SmartMaster()` |
| `ribbong3SmartSuper` | `boolean` | get/set via `setRibbong3SmartSuper()` |
| `ribbong3Tough` | `boolean` | get/set via `setRibbong3Tough()` |
| `ribbong3ToughHyper` | `boolean` | get/set via `setRibbong3ToughHyper()` |
| `ribbong3ToughMaster` | `boolean` | get/set via `setRibbong3ToughMaster()` |
| `ribbong3ToughSuper` | `boolean` | get/set via `setRibbong3ToughSuper()` |
| `ribbong4Beauty` | `boolean` | get/set via `setRibbong4Beauty()` |
| `ribbong4BeautyGreat` | `boolean` | get/set via `setRibbong4BeautyGreat()` |
| `ribbong4BeautyMaster` | `boolean` | get/set via `setRibbong4BeautyMaster()` |
| `ribbong4BeautyUltra` | `boolean` | get/set via `setRibbong4BeautyUltra()` |
| `ribbong4Cool` | `boolean` | get/set via `setRibbong4Cool()` |
| `ribbong4CoolGreat` | `boolean` | get/set via `setRibbong4CoolGreat()` |
| `ribbong4CoolMaster` | `boolean` | get/set via `setRibbong4CoolMaster()` |
| `ribbong4CoolUltra` | `boolean` | get/set via `setRibbong4CoolUltra()` |
| `ribbong4Cute` | `boolean` | get/set via `setRibbong4Cute()` |
| `ribbong4CuteGreat` | `boolean` | get/set via `setRibbong4CuteGreat()` |
| `ribbong4CuteMaster` | `boolean` | get/set via `setRibbong4CuteMaster()` |
| `ribbong4CuteUltra` | `boolean` | get/set via `setRibbong4CuteUltra()` |
| `ribbong4Smart` | `boolean` | get/set via `setRibbong4Smart()` |
| `ribbong4SmartGreat` | `boolean` | get/set via `setRibbong4SmartGreat()` |
| `ribbong4SmartMaster` | `boolean` | get/set via `setRibbong4SmartMaster()` |
| `ribbong4SmartUltra` | `boolean` | get/set via `setRibbong4SmartUltra()` |
| `ribbong4Tough` | `boolean` | get/set via `setRibbong4Tough()` |
| `ribbong4ToughGreat` | `boolean` | get/set via `setRibbong4ToughGreat()` |
| `ribbong4ToughMaster` | `boolean` | get/set via `setRibbong4ToughMaster()` |
| `ribbong4ToughUltra` | `boolean` | get/set via `setRibbong4ToughUltra()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonVictory` | `boolean` | get/set via `setRibbonVictory()` |
| `ribbonWinning` | `boolean` | get/set via `setRibbonWinning()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `setMarking(index: number, value: boolean)` | `void` |  |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getTransferpid(ec: number, oid: number, bitFlipProc: boolean)` | `number` |  |

### `PK6`

*kind: class · context: Gen6 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `consoleRegion` | `number` | get/set via `setConsoleRegion()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `convertTopk7()` | `PK7` |  |
| `country` | `number` | get/set via `setCountry()` |
| `dist7` | `boolean` | get/set via `setDist7()` |
| `dist8` | `boolean` | get/set via `setDist8()` |
| `distSuperTrain1` | `boolean` | get/set via `setDistSuperTrain1()` |
| `distSuperTrain2` | `boolean` | get/set via `setDistSuperTrain2()` |
| `distSuperTrain3` | `boolean` | get/set via `setDistSuperTrain3()` |
| `distSuperTrain4` | `boolean` | get/set via `setDistSuperTrain4()` |
| `distSuperTrain5` | `boolean` | get/set via `setDistSuperTrain5()` |
| `distSuperTrain6` | `boolean` | get/set via `setDistSuperTrain6()` |
| `distTrainBitFlags` | `number` | get/set via `setDistTrainBitFlags()` |
| `enjoyment` | `number` | get/set via `setEnjoyment()` |
| `fixMemories()` | `void` |  |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `fullness` | `number` | get/set via `setFullness()` |
| `geo1Country` | `number` | get/set via `setGeo1Country()` |
| `geo1Region` | `number` | get/set via `setGeo1Region()` |
| `geo2Country` | `number` | get/set via `setGeo2Country()` |
| `geo2Region` | `number` | get/set via `setGeo2Region()` |
| `geo3Country` | `number` | get/set via `setGeo3Country()` |
| `geo3Region` | `number` | get/set via `setGeo3Region()` |
| `geo4Country` | `number` | get/set via `setGeo4Country()` |
| `geo4Region` | `number` | get/set via `setGeo4Region()` |
| `geo5Country` | `number` | get/set via `setGeo5Country()` |
| `geo5Region` | `number` | get/set via `setGeo5Region()` |
| `getMarking(index: number)` | `boolean` |  |
| `groundTile` | `"None" \| "Sand" \| "Grass" \| "Puddle" \| "Rock" \| "Cave" \| "Snow" \| "Water" \| "Ice" \| "Building" \| "Marsh" \| "Bridge" \| "Elite4_1" \| "Max_DP" \| "Elite4_2" \| "Elite4_3" \| "Elite4_4" \| "Elite4_M" \| "DistortionSideways" \| "BattleTower" \| "BattleFactory" \| "BattleArcade" \| "BattleCastle" \| "BattleHall" \| "Distortion" \| "Max_Pt"` | get/set via `setGroundTile()` |
| `handlingTrainerAffection` | `number` | get/set via `setHandlingTrainerAffection()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `isUntradedEvent6` | `boolean` | get-only |
| `markingCircle` | `boolean` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `boolean` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `boolean` | get/set via `setMarkingHeart()` |
| `markingSquare` | `boolean` | get/set via `setMarkingSquare()` |
| `markingStar` | `boolean` | get/set via `setMarkingStar()` |
| `markingTriangle` | `boolean` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `originalTrainerAffection` | `number` | get/set via `setOriginalTrainerAffection()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib56` | `boolean` | get/set via `setRib56()` |
| `rib57` | `boolean` | get/set via `setRib57()` |
| `region` | `number` | get/set via `setRegion()` |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `secretSuperTrainingUnlocked` | `boolean` | get/set via `setSecretSuperTrainingUnlocked()` |
| `setMarking(index: number, value: boolean)` | `void` |  |
| `superTrain1Atk` | `boolean` | get/set via `setSuperTrain1Atk()` |
| `superTrain1Def` | `boolean` | get/set via `setSuperTrain1Def()` |
| `superTrain1Hp` | `boolean` | get/set via `setSuperTrain1Hp()` |
| `superTrain1Spa` | `boolean` | get/set via `setSuperTrain1Spa()` |
| `superTrain1Spd` | `boolean` | get/set via `setSuperTrain1Spd()` |
| `superTrain1Spe` | `boolean` | get/set via `setSuperTrain1Spe()` |
| `superTrain2Atk` | `boolean` | get/set via `setSuperTrain2Atk()` |
| `superTrain2Def` | `boolean` | get/set via `setSuperTrain2Def()` |
| `superTrain2Hp` | `boolean` | get/set via `setSuperTrain2Hp()` |
| `superTrain2Spa` | `boolean` | get/set via `setSuperTrain2Spa()` |
| `superTrain2Spd` | `boolean` | get/set via `setSuperTrain2Spd()` |
| `superTrain2Spe` | `boolean` | get/set via `setSuperTrain2Spe()` |
| `superTrain3Atk` | `boolean` | get/set via `setSuperTrain3Atk()` |
| `superTrain3Def` | `boolean` | get/set via `setSuperTrain3Def()` |
| `superTrain3Hp` | `boolean` | get/set via `setSuperTrain3Hp()` |
| `superTrain3Spa` | `boolean` | get/set via `setSuperTrain3Spa()` |
| `superTrain3Spd` | `boolean` | get/set via `setSuperTrain3Spd()` |
| `superTrain3Spe` | `boolean` | get/set via `setSuperTrain3Spe()` |
| `superTrain41` | `boolean` | get/set via `setSuperTrain41()` |
| `superTrain51` | `boolean` | get/set via `setSuperTrain51()` |
| `superTrain52` | `boolean` | get/set via `setSuperTrain52()` |
| `superTrain53` | `boolean` | get/set via `setSuperTrain53()` |
| `superTrain54` | `boolean` | get/set via `setSuperTrain54()` |
| `superTrain61` | `boolean` | get/set via `setSuperTrain61()` |
| `superTrain62` | `boolean` | get/set via `setSuperTrain62()` |
| `superTrain63` | `boolean` | get/set via `setSuperTrain63()` |
| `superTrain71` | `boolean` | get/set via `setSuperTrain71()` |
| `superTrain72` | `boolean` | get/set via `setSuperTrain72()` |
| `superTrain73` | `boolean` | get/set via `setSuperTrain73()` |
| `superTrain81` | `boolean` | get/set via `setSuperTrain81()` |
| `superTrainBitFlags` | `number` | get/set via `setSuperTrainBitFlags()` |
| `superTrainSupremelyTrained` | `boolean` | get/set via `setSuperTrainSupremelyTrained()` |
| `trainingBag` | `number` | get/set via `setTrainingBag()` |
| `trainingBagEffect` | `number` | get/set via `setTrainingBagEffect()` |
| `trainingBagHits` | `number` | get/set via `setTrainingBagHits()` |
| `unused0` | `boolean` | get/set via `setUnused0()` |
| `unused1` | `boolean` | get/set via `setUnused1()` |

### `PK7`

*kind: class · context: Gen7 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `consoleRegion` | `number` | get/set via `setConsoleRegion()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `country` | `number` | get/set via `setCountry()` |
| `dirtLocation` | `number` | get/set via `setDirtLocation()` |
| `dirtType` | `number` | get/set via `setDirtType()` |
| `dist7` | `boolean` | get/set via `setDist7()` |
| `dist8` | `boolean` | get/set via `setDist8()` |
| `distSuperTrain1` | `boolean` | get/set via `setDistSuperTrain1()` |
| `distSuperTrain2` | `boolean` | get/set via `setDistSuperTrain2()` |
| `distSuperTrain3` | `boolean` | get/set via `setDistSuperTrain3()` |
| `distSuperTrain4` | `boolean` | get/set via `setDistSuperTrain4()` |
| `distSuperTrain5` | `boolean` | get/set via `setDistSuperTrain5()` |
| `distSuperTrain6` | `boolean` | get/set via `setDistSuperTrain6()` |
| `distTrainBitFlags` | `number` | get/set via `setDistTrainBitFlags()` |
| `enjoyment` | `number` | get/set via `setEnjoyment()` |
| `fixMemories()` | `void` |  |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `fullness` | `number` | get/set via `setFullness()` |
| `geo1Country` | `number` | get/set via `setGeo1Country()` |
| `geo1Region` | `number` | get/set via `setGeo1Region()` |
| `geo2Country` | `number` | get/set via `setGeo2Country()` |
| `geo2Region` | `number` | get/set via `setGeo2Region()` |
| `geo3Country` | `number` | get/set via `setGeo3Country()` |
| `geo3Region` | `number` | get/set via `setGeo3Region()` |
| `geo4Country` | `number` | get/set via `setGeo4Country()` |
| `geo4Region` | `number` | get/set via `setGeo4Region()` |
| `geo5Country` | `number` | get/set via `setGeo5Country()` |
| `geo5Region` | `number` | get/set via `setGeo5Region()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerAffection` | `number` | get/set via `setHandlingTrainerAffection()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `isUntradedEvent6` | `boolean` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `originalTrainerAffection` | `number` | get/set via `setOriginalTrainerAffection()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib62` | `boolean` | get/set via `setRib62()` |
| `rib63` | `boolean` | get/set via `setRib63()` |
| `rib64` | `boolean` | get/set via `setRib64()` |
| `rib65` | `boolean` | get/set via `setRib65()` |
| `rib66` | `boolean` | get/set via `setRib66()` |
| `rib67` | `boolean` | get/set via `setRib67()` |
| `region` | `number` | get/set via `setRegion()` |
| `resortEventStatus` | `"NONE" \| "SEIKAKU" \| "CARE" \| "LIKE_RESORT" \| "LIKE_BATTLE" \| "LIKE_ADV" \| "GOOD_FRIEND" \| "GIM" \| "HOTSPA" \| "WILD" \| "WILD_LOVE" \| "WILD_LIVE" \| "POKEMAME_GET1" \| "POKEMAME_GET2" \| "POKEMAME_GET3" \| "KINOMI_HELP" \| "PLAY_STATE" \| "HOTSPA_STATE" \| "HOTSPA_DIZZY" \| "HOTSPA_EGG_HATCHING" \| "MAX"` | get/set via `setResortEventStatus()` |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `secretSuperTrainingUnlocked` | `boolean` | get/set via `setSecretSuperTrainingUnlocked()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `superTrain1Atk` | `boolean` | get/set via `setSuperTrain1Atk()` |
| `superTrain1Def` | `boolean` | get/set via `setSuperTrain1Def()` |
| `superTrain1Hp` | `boolean` | get/set via `setSuperTrain1Hp()` |
| `superTrain1Spa` | `boolean` | get/set via `setSuperTrain1Spa()` |
| `superTrain1Spd` | `boolean` | get/set via `setSuperTrain1Spd()` |
| `superTrain1Spe` | `boolean` | get/set via `setSuperTrain1Spe()` |
| `superTrain2Atk` | `boolean` | get/set via `setSuperTrain2Atk()` |
| `superTrain2Def` | `boolean` | get/set via `setSuperTrain2Def()` |
| `superTrain2Hp` | `boolean` | get/set via `setSuperTrain2Hp()` |
| `superTrain2Spa` | `boolean` | get/set via `setSuperTrain2Spa()` |
| `superTrain2Spd` | `boolean` | get/set via `setSuperTrain2Spd()` |
| `superTrain2Spe` | `boolean` | get/set via `setSuperTrain2Spe()` |
| `superTrain3Atk` | `boolean` | get/set via `setSuperTrain3Atk()` |
| `superTrain3Def` | `boolean` | get/set via `setSuperTrain3Def()` |
| `superTrain3Hp` | `boolean` | get/set via `setSuperTrain3Hp()` |
| `superTrain3Spa` | `boolean` | get/set via `setSuperTrain3Spa()` |
| `superTrain3Spd` | `boolean` | get/set via `setSuperTrain3Spd()` |
| `superTrain3Spe` | `boolean` | get/set via `setSuperTrain3Spe()` |
| `superTrain41` | `boolean` | get/set via `setSuperTrain41()` |
| `superTrain51` | `boolean` | get/set via `setSuperTrain51()` |
| `superTrain52` | `boolean` | get/set via `setSuperTrain52()` |
| `superTrain53` | `boolean` | get/set via `setSuperTrain53()` |
| `superTrain54` | `boolean` | get/set via `setSuperTrain54()` |
| `superTrain61` | `boolean` | get/set via `setSuperTrain61()` |
| `superTrain62` | `boolean` | get/set via `setSuperTrain62()` |
| `superTrain63` | `boolean` | get/set via `setSuperTrain63()` |
| `superTrain71` | `boolean` | get/set via `setSuperTrain71()` |
| `superTrain72` | `boolean` | get/set via `setSuperTrain72()` |
| `superTrain73` | `boolean` | get/set via `setSuperTrain73()` |
| `superTrain81` | `boolean` | get/set via `setSuperTrain81()` |
| `superTrainBitFlags` | `number` | get/set via `setSuperTrainBitFlags()` |
| `superTrainSupremelyTrained` | `boolean` | get/set via `setSuperTrainSupremelyTrained()` |
| `unused0` | `boolean` | get/set via `setUnused0()` |
| `unused1` | `boolean` | get/set via `setUnused1()` |

### `PK8`

*kind: class · context: Gen8 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `dynamaxType` | `number` | get/set via `setDynamaxType()` |
| `fixMemories()` | `void` |  |
| `isSideTransfer` | `boolean` | get-only |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |

### `PK9`

*kind: class · context: Gen9 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `affixedRibbon` | `number` | get/set via `setAffixedRibbon()` |
| `battleVersion` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setBattleVersion()` |
| `belongsTo(tr: ITrainerInfo)` | `boolean` |  |
| `belongsToSkipVersion(tr: ITrainerInfo)` | `boolean` |  |
| `checksum` | `number` | get/set via `setChecksum()` |
| `clearMoveRecordFlags()` | `void` |  |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `fixMemories()` | `void` |  |
| `fixRelearn()` | `void` |  |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `getMoveRecordFlag(index: number)` | `boolean` |  |
| `getMoveRecordFlagAny()` | `boolean` |  |
| `getRibbon(index: number)` | `boolean` |  |
| `getRibbonByte(index: number)` | `number` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerid` | `number` | get/set via `setHandlingTrainerid()` |
| `handlingTrainerLanguage` | `number` | get/set via `setHandlingTrainerLanguage()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `hasBattleMemoryRibbon` | `boolean` | get/set via `setHasBattleMemoryRibbon()` |
| `hasContestMemoryRibbon` | `boolean` | get/set via `setHasContestMemoryRibbon()` |
| `hasMarkEncounter8` | `boolean` | get-only |
| `hasMarkEncounter9` | `boolean` | get-only |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `iv32` | `number` | get/set via `setIv32()` |
| `isFavorite` | `boolean` | get/set via `setIsFavorite()` |
| `isUnhatchedEgg` | `boolean` | get-only |
| `markCount` | `number` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `obedienceLevel` | `number` | get/set via `setObedienceLevel()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `permit` | `IPermitRecord` | get-only |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `rib457` | `boolean` | get/set via `setRib457()` |
| `rib460` | `boolean` | get/set via `setRib460()` |
| `rib461` | `boolean` | get/set via `setRib461()` |
| `rib462` | `boolean` | get/set via `setRib462()` |
| `rib463` | `boolean` | get/set via `setRib463()` |
| `rib464` | `boolean` | get/set via `setRib464()` |
| `rib465` | `boolean` | get/set via `setRib465()` |
| `rib466` | `boolean` | get/set via `setRib466()` |
| `rib467` | `boolean` | get/set via `setRib467()` |
| `rib470` | `boolean` | get/set via `setRib470()` |
| `rib471` | `boolean` | get/set via `setRib471()` |
| `rib472` | `boolean` | get/set via `setRib472()` |
| `rib473` | `boolean` | get/set via `setRib473()` |
| `rib474` | `boolean` | get/set via `setRib474()` |
| `rib475` | `boolean` | get/set via `setRib475()` |
| `rib476` | `boolean` | get/set via `setRib476()` |
| `rib477` | `boolean` | get/set via `setRib477()` |
| `recordFlagsBase` | `Uint8Array` | get-only |
| `recordFlagsdlc` | `Uint8Array` | get-only |
| `ribbonAlert` | `boolean` | get/set via `setRibbonAlert()` |
| `ribbonArtist` | `boolean` | get/set via `setRibbonArtist()` |
| `ribbonBattleRoyale` | `boolean` | get/set via `setRibbonBattleRoyale()` |
| `ribbonBattleTreeGreat` | `boolean` | get/set via `setRibbonBattleTreeGreat()` |
| `ribbonBattleTreeMaster` | `boolean` | get/set via `setRibbonBattleTreeMaster()` |
| `ribbonBattlerExpert` | `boolean` | get/set via `setRibbonBattlerExpert()` |
| `ribbonBattlerSkillful` | `boolean` | get/set via `setRibbonBattlerSkillful()` |
| `ribbonBestFriends` | `boolean` | get/set via `setRibbonBestFriends()` |
| `ribbonBirthday` | `boolean` | get/set via `setRibbonBirthday()` |
| `ribbonCareless` | `boolean` | get/set via `setRibbonCareless()` |
| `ribbonChampionAlola` | `boolean` | get/set via `setRibbonChampionAlola()` |
| `ribbonChampionBattle` | `boolean` | get/set via `setRibbonChampionBattle()` |
| `ribbonChampiong3` | `boolean` | get/set via `setRibbonChampiong3()` |
| `ribbonChampiong6Hoenn` | `boolean` | get/set via `setRibbonChampiong6Hoenn()` |
| `ribbonChampionGalar` | `boolean` | get/set via `setRibbonChampionGalar()` |
| `ribbonChampionKalos` | `boolean` | get/set via `setRibbonChampionKalos()` |
| `ribbonChampionNational` | `boolean` | get/set via `setRibbonChampionNational()` |
| `ribbonChampionPaldea` | `boolean` | get/set via `setRibbonChampionPaldea()` |
| `ribbonChampionRegional` | `boolean` | get/set via `setRibbonChampionRegional()` |
| `ribbonChampionSinnoh` | `boolean` | get/set via `setRibbonChampionSinnoh()` |
| `ribbonChampionWorld` | `boolean` | get/set via `setRibbonChampionWorld()` |
| `ribbonClassic` | `boolean` | get/set via `setRibbonClassic()` |
| `ribbonContestStar` | `boolean` | get/set via `setRibbonContestStar()` |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonCountMemoryBattle` | `number` | get/set via `setRibbonCountMemoryBattle()` |
| `ribbonCountMemoryContest` | `number` | get/set via `setRibbonCountMemoryContest()` |
| `ribbonCountry` | `boolean` | get/set via `setRibbonCountry()` |
| `ribbonDowncast` | `boolean` | get/set via `setRibbonDowncast()` |
| `ribbonEarth` | `boolean` | get/set via `setRibbonEarth()` |
| `ribbonEffort` | `boolean` | get/set via `setRibbonEffort()` |
| `ribbonEvent` | `boolean` | get/set via `setRibbonEvent()` |
| `ribbonFootprint` | `boolean` | get/set via `setRibbonFootprint()` |
| `ribbonGorgeous` | `boolean` | get/set via `setRibbonGorgeous()` |
| `ribbonGorgeousRoyal` | `boolean` | get/set via `setRibbonGorgeousRoyal()` |
| `ribbonHisui` | `boolean` | get/set via `setRibbonHisui()` |
| `ribbonLegend` | `boolean` | get/set via `setRibbonLegend()` |
| `ribbonMarkAbsentMinded` | `boolean` | get/set via `setRibbonMarkAbsentMinded()` |
| `ribbonMarkAlpha` | `boolean` | get/set via `setRibbonMarkAlpha()` |
| `ribbonMarkAngry` | `boolean` | get/set via `setRibbonMarkAngry()` |
| `ribbonMarkBlizzard` | `boolean` | get/set via `setRibbonMarkBlizzard()` |
| `ribbonMarkCalmness` | `boolean` | get/set via `setRibbonMarkCalmness()` |
| `ribbonMarkCharismatic` | `boolean` | get/set via `setRibbonMarkCharismatic()` |
| `ribbonMarkCloudy` | `boolean` | get/set via `setRibbonMarkCloudy()` |
| `ribbonMarkCount` | `number` | get-only |
| `ribbonMarkCrafty` | `boolean` | get/set via `setRibbonMarkCrafty()` |
| `ribbonMarkCurry` | `boolean` | get/set via `setRibbonMarkCurry()` |
| `ribbonMarkDawn` | `boolean` | get/set via `setRibbonMarkDawn()` |
| `ribbonMarkDestiny` | `boolean` | get/set via `setRibbonMarkDestiny()` |
| `ribbonMarkDry` | `boolean` | get/set via `setRibbonMarkDry()` |
| `ribbonMarkDusk` | `boolean` | get/set via `setRibbonMarkDusk()` |
| `ribbonMarkExcited` | `boolean` | get/set via `setRibbonMarkExcited()` |
| `ribbonMarkFerocious` | `boolean` | get/set via `setRibbonMarkFerocious()` |
| `ribbonMarkFishing` | `boolean` | get/set via `setRibbonMarkFishing()` |
| `ribbonMarkFlustered` | `boolean` | get/set via `setRibbonMarkFlustered()` |
| `ribbonMarkGourmand` | `boolean` | get/set via `setRibbonMarkGourmand()` |
| `ribbonMarkHumble` | `boolean` | get/set via `setRibbonMarkHumble()` |
| `ribbonMarkIntellectual` | `boolean` | get/set via `setRibbonMarkIntellectual()` |
| `ribbonMarkIntense` | `boolean` | get/set via `setRibbonMarkIntense()` |
| `ribbonMarkItemfinder` | `boolean` | get/set via `setRibbonMarkItemfinder()` |
| `ribbonMarkJittery` | `boolean` | get/set via `setRibbonMarkJittery()` |
| `ribbonMarkJoyful` | `boolean` | get/set via `setRibbonMarkJoyful()` |
| `ribbonMarkJumbo` | `boolean` | get/set via `setRibbonMarkJumbo()` |
| `ribbonMarkKindly` | `boolean` | get/set via `setRibbonMarkKindly()` |
| `ribbonMarkLunchtime` | `boolean` | get/set via `setRibbonMarkLunchtime()` |
| `ribbonMarkMightiest` | `boolean` | get/set via `setRibbonMarkMightiest()` |
| `ribbonMarkMini` | `boolean` | get/set via `setRibbonMarkMini()` |
| `ribbonMarkMisty` | `boolean` | get/set via `setRibbonMarkMisty()` |
| `ribbonMarkPartner` | `boolean` | get/set via `setRibbonMarkPartner()` |
| `ribbonMarkPeeved` | `boolean` | get/set via `setRibbonMarkPeeved()` |
| `ribbonMarkPrideful` | `boolean` | get/set via `setRibbonMarkPrideful()` |
| `ribbonMarkPumpedUp` | `boolean` | get/set via `setRibbonMarkPumpedUp()` |
| `ribbonMarkRainy` | `boolean` | get/set via `setRibbonMarkRainy()` |
| `ribbonMarkRare` | `boolean` | get/set via `setRibbonMarkRare()` |
| `ribbonMarkRowdy` | `boolean` | get/set via `setRibbonMarkRowdy()` |
| `ribbonMarkSandstorm` | `boolean` | get/set via `setRibbonMarkSandstorm()` |
| `ribbonMarkScowling` | `boolean` | get/set via `setRibbonMarkScowling()` |
| `ribbonMarkSleepyTime` | `boolean` | get/set via `setRibbonMarkSleepyTime()` |
| `ribbonMarkSlump` | `boolean` | get/set via `setRibbonMarkSlump()` |
| `ribbonMarkSmiley` | `boolean` | get/set via `setRibbonMarkSmiley()` |
| `ribbonMarkSnowy` | `boolean` | get/set via `setRibbonMarkSnowy()` |
| `ribbonMarkStormy` | `boolean` | get/set via `setRibbonMarkStormy()` |
| `ribbonMarkTeary` | `boolean` | get/set via `setRibbonMarkTeary()` |
| `ribbonMarkThorny` | `boolean` | get/set via `setRibbonMarkThorny()` |
| `ribbonMarkTitan` | `boolean` | get/set via `setRibbonMarkTitan()` |
| `ribbonMarkUncommon` | `boolean` | get/set via `setRibbonMarkUncommon()` |
| `ribbonMarkUnsure` | `boolean` | get/set via `setRibbonMarkUnsure()` |
| `ribbonMarkUpbeat` | `boolean` | get/set via `setRibbonMarkUpbeat()` |
| `ribbonMarkVigor` | `boolean` | get/set via `setRibbonMarkVigor()` |
| `ribbonMarkZeroEnergy` | `boolean` | get/set via `setRibbonMarkZeroEnergy()` |
| `ribbonMarkZonedOut` | `boolean` | get/set via `setRibbonMarkZonedOut()` |
| `ribbonMasterBeauty` | `boolean` | get/set via `setRibbonMasterBeauty()` |
| `ribbonMasterCleverness` | `boolean` | get/set via `setRibbonMasterCleverness()` |
| `ribbonMasterCoolness` | `boolean` | get/set via `setRibbonMasterCoolness()` |
| `ribbonMasterCuteness` | `boolean` | get/set via `setRibbonMasterCuteness()` |
| `ribbonMasterRank` | `boolean` | get/set via `setRibbonMasterRank()` |
| `ribbonMasterToughness` | `boolean` | get/set via `setRibbonMasterToughness()` |
| `ribbonNational` | `boolean` | get/set via `setRibbonNational()` |
| `ribbonOnceInAlifetime` | `boolean` | get/set via `setRibbonOnceInAlifetime()` |
| `ribbonPartner` | `boolean` | get/set via `setRibbonPartner()` |
| `ribbonPremier` | `boolean` | get/set via `setRibbonPremier()` |
| `ribbonRecord` | `boolean` | get/set via `setRibbonRecord()` |
| `ribbonRelax` | `boolean` | get/set via `setRibbonRelax()` |
| `ribbonRoyal` | `boolean` | get/set via `setRibbonRoyal()` |
| `ribbonShock` | `boolean` | get/set via `setRibbonShock()` |
| `ribbonSmile` | `boolean` | get/set via `setRibbonSmile()` |
| `ribbonSnooze` | `boolean` | get/set via `setRibbonSnooze()` |
| `ribbonSouvenir` | `boolean` | get/set via `setRibbonSouvenir()` |
| `ribbonSpecial` | `boolean` | get/set via `setRibbonSpecial()` |
| `ribbonTowerMaster` | `boolean` | get/set via `setRibbonTowerMaster()` |
| `ribbonTraining` | `boolean` | get/set via `setRibbonTraining()` |
| `ribbonTwinklingStar` | `boolean` | get/set via `setRibbonTwinklingStar()` |
| `ribbonWishing` | `boolean` | get/set via `setRibbonWishing()` |
| `ribbonWorld` | `boolean` | get/set via `setRibbonWorld()` |
| `sanity` | `number` | get/set via `setSanity()` |
| `scale` | `number` | get/set via `setScale()` |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `setMoveRecordFlag(index: number, value: boolean)` | `void` |  |
| `setRibbon(index: number, value: boolean)` | `void` |  |
| `speciesInternal` | `number` | get/set via `setSpeciesInternal()` |
| `teraType` | `"Any" \| "Normal" \| "Fighting" \| "Flying" \| "Poison" \| "Ground" \| "Rock" \| "Bug" \| "Ghost" \| "Steel" \| "Fire" \| "Water" \| "Grass" \| "Electric" \| "Psychic" \| "Ice" \| "Dragon" \| "Dark" \| "Fairy"` | readonly (computed) |
| `teraTypeOriginal` | `"Any" \| "Normal" \| "Fighting" \| "Flying" \| "Poison" \| "Ground" \| "Rock" \| "Bug" \| "Ghost" \| "Steel" \| "Fire" \| "Water" \| "Grass" \| "Electric" \| "Psychic" \| "Ice" \| "Dragon" \| "Dark" \| "Fairy"` | get/set via `setTeraTypeOriginal()` |
| `teraTypeOverride` | `"Any" \| "Normal" \| "Fighting" \| "Flying" \| "Poison" \| "Ground" \| "Rock" \| "Bug" \| "Ghost" \| "Steel" \| "Fire" \| "Water" \| "Grass" \| "Electric" \| "Psychic" \| "Ice" \| "Dragon" \| "Dark" \| "Fairy"` | get/set via `setTeraTypeOverride()` |
| `tracker` | `bigint` | get/set via `setTracker()` |
| `updateHandler(tr: ITrainerInfo)` | `void` |  |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

### `PKH`

*kind: class · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `affixedRibbon` | `number` | get/set via `setAffixedRibbon()` |
| `battleVersion` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setBattleVersion()` |
| `checksum` | `number` | get/set via `setChecksum()` |
| `contestBeauty` | `number` | get/set via `setContestBeauty()` |
| `contestCool` | `number` | get/set via `setContestCool()` |
| `contestCute` | `number` | get/set via `setContestCute()` |
| `contestSheen` | `number` | get/set via `setContestSheen()` |
| `contestSmart` | `number` | get/set via `setContestSmart()` |
| `contestTough` | `number` | get/set via `setContestTough()` |
| `convertTopa8()` | `PA8` |  |
| `convertTopa9()` | `PA9` |  |
| `convertTopb7()` | `PB7` |  |
| `convertTopb8()` | `PB8` |  |
| `convertTopk8()` | `PK8` |  |
| `convertTopk9()` | `PK9` |  |
| `convertTopkm(type: "None" | "PB7" | "PK8" | "PA8" | "PB8" | "PK9" | "PC9" | "PA9")` | `PKM` |  |
| `copyFrom(pk: PKM)` | `void` |  |
| `copyTo(pk: PKM)` | `void` |  |
| `core` | `GameDataCore` | get/set via `setCore()` |
| `coreDataSize` | `number` | get/set via `setCoreDataSize()` |
| `datapa8` | `GameDataPA8` | get/set via `setDatapa8()` |
| `datapa9` | `GameDataPA9` | get/set via `setDatapa9()` |
| `datapb7` | `GameDataPB7` | get/set via `setDatapb7()` |
| `datapb8` | `GameDataPB8` | get/set via `setDatapb8()` |
| `datapc9` | `GameDataPC9` | get/set via `setDatapc9()` |
| `datapk8` | `GameDataPK8` | get/set via `setDatapk8()` |
| `datapk9` | `GameDataPK9` | get/set via `setDatapk9()` |
| `dataVersion` | `number` | get/set via `setDataVersion()` |
| `encodedDataSize` | `number` | get/set via `setEncodedDataSize()` |
| `encryptionSeed` | `bigint` | get/set via `setEncryptionSeed()` |
| `favorite` | `boolean` | get/set via `setFavorite()` |
| `formArgument` | `number` | get/set via `setFormArgument()` |
| `formArgumentElapsed` | `number` | get/set via `setFormArgumentElapsed()` |
| `formArgumentMaximum` | `number` | get/set via `setFormArgumentMaximum()` |
| `formArgumentRemain` | `number` | get/set via `setFormArgumentRemain()` |
| `gameDataSize` | `number` | get/set via `setGameDataSize()` |
| `getMarking(index: number)` | `"None" \| "Blue" \| "Pink"` |  |
| `htAtk` | `boolean` | get/set via `setHtAtk()` |
| `htDef` | `boolean` | get/set via `setHtDef()` |
| `htHp` | `boolean` | get/set via `setHtHp()` |
| `htSpa` | `boolean` | get/set via `setHtSpa()` |
| `htSpd` | `boolean` | get/set via `setHtSpd()` |
| `htSpe` | `boolean` | get/set via `setHtSpe()` |
| `handlingTrainerid` | `number` | get/set via `setHandlingTrainerid()` |
| `handlingTrainerLanguage` | `number` | get/set via `setHandlingTrainerLanguage()` |
| `handlingTrainerMemory` | `number` | get/set via `setHandlingTrainerMemory()` |
| `handlingTrainerMemoryFeeling` | `number` | get/set via `setHandlingTrainerMemoryFeeling()` |
| `handlingTrainerMemoryIntensity` | `number` | get/set via `setHandlingTrainerMemoryIntensity()` |
| `handlingTrainerMemoryVariable` | `number` | get/set via `setHandlingTrainerMemoryVariable()` |
| `heightScalar` | `number` | get/set via `setHeightScalar()` |
| `hyperTrainFlags` | `number` | get/set via `setHyperTrainFlags()` |
| `isBadEgg` | `boolean` | get/set via `setIsBadEgg()` |
| `latestGameData` | `IGameDataSide` | get-only |
| `markCount` | `number` | get-only |
| `markingCircle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingCircle()` |
| `markingCount` | `number` | readonly (computed) |
| `markingDiamond` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingDiamond()` |
| `markingHeart` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingHeart()` |
| `markingSquare` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingSquare()` |
| `markingStar` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingStar()` |
| `markingTriangle` | `"None" \| "Blue" \| "Pink"` | get/set via `setMarkingTriangle()` |
| `markingValue` | `number` | get/set via `setMarkingValue()` |
| `originalTrainerMemory` | `number` | get/set via `setOriginalTrainerMemory()` |
| `originalTrainerMemoryFeeling` | `number` | get/set via `setOriginalTrainerMemoryFeeling()` |
| `originalTrainerMemoryIntensity` | `number` | get/set via `setOriginalTrainerMemoryIntensity()` |
| `originalTrainerMemoryVariable` | `number` | get/set via `setOriginalTrainerMemoryVariable()` |
| `rebuild(dest: Uint8Array)` | `number` |  |
| `rebuild()` | `Uint8Array` |  |
| `ribbonCount` | `number` | readonly (computed) |
| `ribbonMarkCount` | `number` | get-only |
| `setMarking(index: number, value: "None" | "Blue" | "Pink")` | `void` |  |
| `tracker` | `bigint` | get/set via `setTracker()` |
| `weightScalar` | `number` | get/set via `setWeightScalar()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `convertFrompkm(pk: PKM)` | `PKH` |  |
| `getPaddedSize(innerLength: number, remainder: number)` | `number` |  |
| `updateHandler(pk: T, tr: ITrainerInfo)` | `void` |  |

### `PKM`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `ao` | `boolean` | get-only |
| `ability` | `number` | get/set via `setAbility()` |
| `abilityNumber` | `number` | get/set via `setAbilityNumber()` |
| `addMove(move: number, pushOut: boolean)` | `boolean` |  |
| `b2w2` | `boolean` | get-only |
| `bdsp` | `boolean` | get-only |
| `bw` | `boolean` | get-only |
| `ball` | `number` | get/set via `setBall()` |
| `canHoldItem(valid: readonly number[])` | `boolean` |  |
| `characteristic` | `number` | readonly (computed) |
| `checksumValid` | `boolean` | get-only — Indicates if the data has a proper checksum. |
| `clearInvalidMoves()` | `void` | Clears moves that a  may have, possibly from a future generation. |
| `clone()` | `PKM` | Deep clones the  object. The clone will not have any shared resources with the source. |
| `context` | `"None" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen8" \| "Gen9" \| "SplitInvalid" \| "Gen7b" \| "Gen8a" \| "Gen8b" \| "Gen9a" \| "MaxInvalid"` | get-only |
| `currentFriendship` | `number` | get/set via `setCurrentFriendship()` |
| `currentHandler` | `number` | get/set via `setCurrentHandler()` |
| `currentLevel` | `number` | readonly (computed) |
| `data` | `Uint8Array` | get-only |
| `displaysid` | `number` | get/set via `setDisplaysid()` |
| `displaytid` | `number` | get/set via `setDisplaytid()` |
| `e` | `boolean` | get-only |
| `evTotal` | `number` | readonly (computed) |
| `evAtk` | `number` | get/set via `setEvAtk()` |
| `evDef` | `number` | get/set via `setEvDef()` |
| `evHp` | `number` | get/set via `setEvHp()` |
| `evSpa` | `number` | get/set via `setEvSpa()` |
| `evSpd` | `number` | get/set via `setEvSpd()` |
| `evSpe` | `number` | get/set via `setEvSpe()` |
| `exp` | `number` | get/set via `setExp()` |
| `eggDay` | `number` | get/set via `setEggDay()` |
| `eggLocation` | `number` | get/set via `setEggLocation()` |
| `eggMetDate` | `string \| null` | get/set via `setEggMetDate()` — The date a Pokémon was met as an egg. |
| `eggMonth` | `number` | get/set via `setEggMonth()` |
| `eggYear` | `number` | get/set via `setEggYear()` |
| `encryptionConstant` | `number` | get/set via `setEncryptionConstant()` |
| `equalsStored(pk: PKM)` | `boolean` |  |
| `extension` | `string` | get-only |
| `extraBytes` | `readonly number[]` | get-only — Bytes in the data structure that are unused, either as alignment padding, or were reserved and never used. |
| `frlg` | `boolean` | get-only |
| `fatefulEncounter` | `boolean` | get/set via `setFatefulEncounter()` |
| `fileName` | `string` | readonly (computed) |
| `fileNameWithoutExtension` | `string` | readonly (computed) |
| `fixMoves()` | `void` | Reorders moves and fixes PP if necessary. |
| `flawlessivCount` | `number` | readonly (computed) |
| `forcePartyData()` | `boolean` | Enforces that Party Stat values are present. |
| `form` | `number` | get/set via `setForm()` |
| `format` | `number` | readonly (computed) |
| `gg` | `boolean` | get-only |
| `go` | `boolean` | get-only |
| `goHome` | `boolean` | get-only |
| `goLgpe` | `boolean` | get-only |
| `gen1` | `boolean` | get-only |
| `gen2` | `boolean` | get-only |
| `gen3` | `boolean` | get-only |
| `gen4` | `boolean` | get-only |
| `gen5` | `boolean` | get-only |
| `gen6` | `boolean` | get-only |
| `gen7` | `boolean` | get-only |
| `gen8` | `boolean` | get-only |
| `gen9` | `boolean` | get-only |
| `genu` | `boolean` | get-only |
| `gender` | `number` | get/set via `setGender()` |
| `generation` | `number` | readonly (computed) |
| `getBasepp(move: number)` | `number` |  |
| `getBytesPerChar()` | `number` |  |
| `getev(index: number)` | `number` |  |
| `getEvs(value: readonly number[])` | `void` |  |
| `getiv(index: number)` | `number` |  |
| `getIvs(value: readonly number[])` | `void` |  |
| `getIvs()` | `number` |  |
| `getMove(index: number)` | `number` |  |
| `getMoveIndex(move: number)` | `number` |  |
| `getMovepp(move: number, ppUpCount: number)` | `number` |  |
| `getMoves(value: readonly number[])` | `void` |  |
| `getRelearnMove(index: number)` | `number` |  |
| `getRelearnMoves(value: readonly number[])` | `void` |  |
| `getStats(p: IBaseStat)` | `readonly number[]` |  |
| `getString(data: Uint8Array)` | `string` |  |
| `getStringLength(data: Uint8Array)` | `number` |  |
| `getStringTerminatorIndex(data: Uint8Array)` | `number` |  |
| `hgss` | `boolean` | get-only |
| `hpPower` | `number` | get-only |
| `hpType` | `number` | get/set via `setHpType()` |
| `handlingTrainerFriendship` | `number` | get/set via `setHandlingTrainerFriendship()` |
| `handlingTrainerGender` | `number` | get/set via `setHandlingTrainerGender()` |
| `handlingTrainerName` | `string` | get/set via `setHandlingTrainerName()` |
| `handlingTrainerTrash` | `Uint8Array` | get-only |
| `hasMove(move: number)` | `boolean` |  |
| `hasOriginalMetLocation` | `boolean` | readonly (computed) — Checks if the PKM has its original met location. |
| `hasRelearnMove(move: number)` | `boolean` |  |
| `heal()` | `void` |  |
| `healpp()` | `void` | Restores PP to maximum based on the current PP Ups for each move. |
| `healppIndex(index: number)` | `number` |  |
| `heldItem` | `number` | get/set via `setHeldItem()` |
| `id32` | `number` | get/set via `setId32()` |
| `ivTotal` | `number` | readonly (computed) |
| `ivAtk` | `number` | get/set via `setIvAtk()` |
| `ivDef` | `number` | get/set via `setIvDef()` |
| `ivHp` | `number` | get/set via `setIvHp()` |
| `ivSpa` | `number` | get/set via `setIvSpa()` |
| `ivSpd` | `number` | get/set via `setIvSpd()` |
| `ivSpe` | `number` | get/set via `setIvSpe()` |
| `ivs` | `readonly number[]` | get/set via `setIvs()` |
| `isEgg` | `boolean` | get/set via `setIsEgg()` |
| `isGenderValid()` | `boolean` | Checks if the current  is valid. |
| `isNicknamed` | `boolean` | get/set via `setIsNicknamed()` |
| `isOriginValid` | `boolean` | readonly (computed) |
| `isPokerusCured` | `boolean` | get/set via `setIsPokerusCured()` |
| `isPokerusInfected` | `boolean` | get/set via `setIsPokerusInfected()` |
| `isShiny` | `boolean` | readonly (computed) |
| `isTradedEgg` | `boolean` | readonly (computed) |
| `isUntraded` | `boolean` | readonly (computed) |
| `japanese` | `boolean` | readonly (computed) |
| `korean` | `boolean` | readonly (computed) |
| `la` | `boolean` | get-only |
| `lgpe` | `boolean` | get-only |
| `language` | `number` | get/set via `setLanguage()` |
| `loadStats(p: IBaseStat, stats: readonly number[])` | `void` |  |
| `loadString(data: Uint8Array, text: readonly string[])` | `number` |  |
| `maxAbilityid` | `number` | get-only |
| `maxBallid` | `number` | get-only |
| `maxev` | `number` | get-only |
| `maxGameid` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get-only |
| `maxiv` | `number` | get-only |
| `maxItemid` | `number` | get-only |
| `maxMoveid` | `number` | get-only |
| `maxSpeciesid` | `number` | get-only |
| `maxStringLengthNickname` | `number` | get-only — Maximum length a Nickname can be represented as. |
| `maxStringLengthTrainer` | `number` | get-only — Maximum length a Trainer Name can be represented as. |
| `maximumiv` | `number` | readonly (computed) |
| `metDate` | `string \| null` | get/set via `setMetDate()` — The date the Pokémon was met. |
| `metDay` | `number` | get/set via `setMetDay()` |
| `metLevel` | `number` | get/set via `setMetLevel()` |
| `metLocation` | `number` | get/set via `setMetLocation()` |
| `metMonth` | `number` | get/set via `setMetMonth()` |
| `metYear` | `number` | get/set via `setMetYear()` |
| `minGameid` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get-only |
| `move1` | `number` | get/set via `setMove1()` |
| `move1Pp` | `number` | get/set via `setMove1Pp()` |
| `move1PpUps` | `number` | get/set via `setMove1PpUps()` |
| `move2` | `number` | get/set via `setMove2()` |
| `move2Pp` | `number` | get/set via `setMove2Pp()` |
| `move2PpUps` | `number` | get/set via `setMove2PpUps()` |
| `move3` | `number` | get/set via `setMove3()` |
| `move3Pp` | `number` | get/set via `setMove3Pp()` |
| `move3PpUps` | `number` | get/set via `setMove3PpUps()` |
| `move4` | `number` | get/set via `setMove4()` |
| `move4Pp` | `number` | get/set via `setMove4Pp()` |
| `move4PpUps` | `number` | get/set via `setMove4PpUps()` |
| `moveCount` | `number` | readonly (computed) — Count of non-zero moves in the moveset. |
| `moves` | `readonly number[]` | get/set via `setMoves()` |
| `nature` | `"Hardy" \| "Lonely" \| "Brave" \| "Adamant" \| "Naughty" \| "Bold" \| "Docile" \| "Relaxed" \| "Impish" \| "Lax" \| "Timid" \| "Hasty" \| "Serious" \| "Jolly" \| "Naive" \| "Modest" \| "Mild" \| "Quiet" \| "Bashful" \| "Rash" \| "Calm" \| "Gentle" \| "Sassy" \| "Careful" \| "Quirky" \| "Random"` | get/set via `setNature()` |
| `nickname` | `string` | get/set via `setNickname()` |
| `nicknameTrash` | `Uint8Array` | get-only |
| `originalTrainerFriendship` | `number` | get/set via `setOriginalTrainerFriendship()` |
| `originalTrainerGender` | `number` | get/set via `setOriginalTrainerGender()` |
| `originalTrainerName` | `string` | get/set via `setOriginalTrainerName()` |
| `originalTrainerTrash` | `Uint8Array` | get-only |
| `pid` | `number` | get/set via `setPid()` |
| `pidAbility` | `number` | readonly (computed) |
| `psv` | `number` | readonly (computed) |
| `partyStatsPresent` | `boolean` | readonly (computed) — Indicates if Party Stats are present. False if not initialized (from stored format). |
| `personalInfo` | `PersonalInfo` | get-only |
| `pokerusDays` | `number` | get/set via `setPokerusDays()` |
| `pokerusStrain` | `number` | get/set via `setPokerusStrain()` |
| `potentialRating` | `number` | readonly (computed) — Gets the IV Judge Rating value. |
| `prepareNickname()` | `void` | Conditions the  data to safely terminate the Nickname string from the text entry screen. |
| `pt` | `boolean` | get-only |
| `refreshAbility(n: number)` | `void` |  |
| `refreshChecksum()` | `void` | Updates the checksum of the . |
| `relearnMove1` | `number` | get/set via `setRelearnMove1()` |
| `relearnMove2` | `number` | get/set via `setRelearnMove2()` |
| `relearnMove3` | `number` | get/set via `setRelearnMove3()` |
| `relearnMove4` | `number` | get/set via `setRelearnMove4()` |
| `relearnMoves` | `readonly number[]` | get/set via `setRelearnMoves()` |
| `resetPartyStats()` | `void` | Clears any status condition and refreshes the stats. |
| `sid16` | `number` | get/set via `setSid16()` |
| `sizeParty` | `number` | get-only |
| `sizeStored` | `number` | get-only |
| `sm` | `boolean` | get-only |
| `sv` | `boolean` | get-only |
| `swsh` | `boolean` | get-only |
| `setEvs(value: readonly number[])` | `void` |  |
| `setIvs(value: readonly number[])` | `void` |  |
| `setIvs(iv32: number)` | `void` |  |
| `setMove(index: number, value: number)` | `number` |  |
| `setMoves(value: readonly number[])` | `void` |  |
| `setpidGender(gender: number)` | `void` |  |
| `setpidNature(nature: "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty" | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax" | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive" | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash" | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky" | "Random")` | `void` |  |
| `setpidUnown3(form: number)` | `void` |  |
| `setRandomIvs(ivs: readonly number[], minFlawless: number)` | `void` |  |
| `setRandomIvs(ivs: readonly number[], template: IndividualValueSet)` | `void` |  |
| `setRandomIvs(template: IndividualValueSet)` | `void` |  |
| `setRandomIvs(minFlawless: number)` | `void` |  |
| `setRandomIvsgo(ivs: readonly number[], minIV: number, maxIV: number)` | `void` |  |
| `setRandomIvsgo(minIV: number, maxIV: number)` | `void` |  |
| `setRelearnMove(index: number, value: number)` | `number` |  |
| `setRelearnMoves(value: readonly number[])` | `void` |  |
| `setShiny()` | `void` | Applies a shiny  to the . |
| `setShinysid(shiny: "Random" | "Never" | "Always" | "AlwaysStar" | "AlwaysSquare" | "FixedValue")` | `void` |  |
| `setStats(stats: readonly number[])` | `void` |  |
| `setString(data: Uint8Array, text: readonly string[], length: number, option: "None" | "ClearZero" | "Clear50" | "Clear7F" | "ClearFF" | "ClearZeroSafeTerminate")` | `number` |  |
| `shinyXor` | `number` | readonly (computed) |
| `species` | `number` | get/set via `setSpecies()` |
| `spriteItem` | `number` | readonly (computed) |
| `statAlignment` | `"Hardy" \| "Lonely" \| "Brave" \| "Adamant" \| "Naughty" \| "Bold" \| "Docile" \| "Relaxed" \| "Impish" \| "Lax" \| "Timid" \| "Hasty" \| "Serious" \| "Jolly" \| "Naive" \| "Modest" \| "Mild" \| "Quiet" \| "Bashful" \| "Rash" \| "Calm" \| "Gentle" \| "Sassy" \| "Careful" \| "Quirky" \| "Random"` | get/set via `setStatAlignment()` |
| `statAtk` | `number` | get/set via `setStatAtk()` |
| `statDef` | `number` | get/set via `setStatDef()` |
| `statHpCurrent` | `number` | get/set via `setStatHpCurrent()` |
| `statHpMax` | `number` | get/set via `setStatHpMax()` |
| `statLevel` | `number` | get/set via `setStatLevel()` |
| `statSpa` | `number` | get/set via `setStatSpa()` |
| `statSpd` | `number` | get/set via `setStatSpd()` |
| `statSpe` | `number` | get/set via `setStatSpe()` |
| `stats` | `readonly number[]` | get/set via `setStats()` |
| `statusCondition` | `number` | get/set via `setStatusCondition()` |
| `tid16` | `number` | get/set via `setTid16()` |
| `tsv` | `number` | readonly (computed) |
| `traineridDisplayFormat` | `"None" \| "SixteenBitSingle" \| "SixteenBit" \| "SixDigit"` | get-only |
| `trainersid7` | `number` | get/set via `setTrainersid7()` |
| `trainertid7` | `number` | get/set via `setTrainertid7()` |
| `transferPropertiesWithReflection(result: PKM)` | `void` |  |
| `trashCharCountNickname` | `number` | get-only — Total characters allocated for holding a Nickname. |
| `trashCharCountTrainer` | `number` | get-only — Total characters allocated for holding a Trainer Name. |
| `usum` | `boolean` | get-only |
| `vc` | `boolean` | get-only |
| `vc1` | `boolean` | get-only |
| `vc2` | `boolean` | get-only |
| `valid` | `boolean` | get/set via `setValid()` — Rough indication if the data is junk or not. |
| `version` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setVersion()` |
| `wasEgg` | `boolean` | readonly (computed) |
| `wasTradedEgg` | `boolean` | readonly (computed) |
| `writeDecryptedDataParty(stored: Uint8Array, party: Uint8Array)` | `void` |  |
| `writeDecryptedDataParty(destination: Uint8Array)` | `void` |  |
| `writeDecryptedDataStored(destination: Uint8Array)` | `number` |  |
| `writeEncryptedDataParty(stored: Uint8Array, party: Uint8Array)` | `void` |  |
| `writeEncryptedDataParty(destination: Uint8Array)` | `void` |  |
| `writeEncryptedDataStored(destination: Uint8Array)` | `void` |  |
| `xy` | `boolean` | get-only |
| `za` | `boolean` | get-only |

### `PlayerBag`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `clamp(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, requestVal: number)` | `number` |  |
| `copyTo(sav: SaveFile)` | `void` |  |
| `getMaxCount(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number)` | `number` |  |
| `getPouch(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones")` | `InventoryPouch` |  |
| `info` | `IItemStorage` | get-only |
| `isLegal(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, itemCount: number)` | `boolean` |  |
| `isQuantitySane(type: "None" | "Items" | "KeyItems" | "TMHMs" | "Medicine" | "Berries" | "Balls" | "BattleItems" | "MailItems" | "PCItems" | "FreeSpace" | "ZCrystals" | "Candy" | "Treasure" | "Ingredients" | "MegaStones", itemIndex: number, count: number, hasNew: boolean, HaX: boolean)` | `boolean` |  |
| `maxQuantityHax` | `number` | get-only |
| `pouches` | `readonly InventoryPouch[]` | get-only — Gets the pouches represented by the bag. |

### `PlayerBag1`

*kind: class · extends `PlayerBag`.*

### `PlayerBag2`

*kind: class · extends `PlayerBag`.*

### `PlayerBag3Colosseum`

*kind: class · extends `PlayerBag`.*

### `PlayerBag3E`

*kind: class · extends `PlayerBag`.*

| Member | Type | Description |
| --- | --- | --- |
| `updateSecurityKey(securityKey: number)` | `void` |  |

### `PlayerBag3FRLG`

*kind: class · extends `PlayerBag`.*

| Member | Type | Description |
| --- | --- | --- |
| `updateSecurityKey(securityKey: number)` | `void` |  |

### `PlayerBag3RS`

*kind: class · extends `PlayerBag`.*

### `PlayerBag3XD`

*kind: class · extends `PlayerBag`.*

### `PlayerBag4DP`

*kind: class · extends `PlayerBag`.*

### `PlayerBag4HGSS`

*kind: class · extends `PlayerBag`.*

### `PlayerBag4Pt`

*kind: class · extends `PlayerBag`.*

### `PlayerBag5B2W2`

*kind: class · extends `PlayerBag`.*

### `PlayerBag5BW`

*kind: class · extends `PlayerBag`.*

### `PlayerBag6AO`

*kind: class · extends `PlayerBag`.*

### `PlayerBag6XY`

*kind: class · extends `PlayerBag`.*

### `PlayerBag7SM`

*kind: class · extends `PlayerBag`.*

### `PlayerBag7USUM`

*kind: class · extends `PlayerBag`.*

### `PlayerBag7b`

*kind: class · extends `PlayerBag`.*

### `PlayerBag8`

*kind: class · extends `PlayerBag`.*

### `PlayerBag8a`

*kind: class · extends `PlayerBag`.*

### `PlayerBag8b`

*kind: class · extends `PlayerBag`.*

### `PlayerBag9`

*kind: class · extends `PlayerBag`.*

### `PlayerBag9a`

*kind: class · extends `PlayerBag`.*

### `RK4`

*kind: class · context: Gen4 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `convertTopk4()` | `PK4` |  |
| `handlingTrainerid32` | `number` | get/set via `setHandlingTrainerid32()` |
| `handlingTrainersid` | `number` | get/set via `setHandlingTrainersid()` |
| `handlingTrainertid` | `number` | get/set via `setHandlingTrainertid()` |
| `ownershipStatus` | `"None" \| "Traded"` | get/set via `setOwnershipStatus()` |
| `ownershipType` | `"None" \| "Trainer" \| "Hayley" \| "Hayley_Traded"` | get/set via `setOwnershipType()` |

### `Records`

*kind: static.*

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `dailyPairs6` | `Uint8Array` | get-only |
| `dailyPairs7` | `Uint8Array` | get-only |
| `festaPairs7` | `Uint8Array` | get-only — Festa pairs; if updating the lower index record, update the Festa Mission record if currently active? |
| `getMax(recordID: number, maxes: Uint8Array)` | `number` |  |
| `getOffset(recordID: number)` | `number` |  |

### `SAV1`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `badges` | `number` | get/set via `setBadges()` |
| `battleEffects` | `boolean` | get/set via `setBattleEffects()` |
| `battleStyleSwitch` | `boolean` | get/set via `setBattleStyleSwitch()` |
| `boxesInitialized` | `boolean` | get/set via `setBoxesInitialized()` |
| `coin` | `number` | get/set via `setCoin()` |
| `daycareSlotCount` | `number` | get-only |
| `eventFlagCount` | `number` | get-only |
| `eventSpawnFlags` | `readonly boolean[]` | get/set via `setEventSpawnFlags()` |
| `eventWorkCount` | `number` | get-only |
| `gbPrinterBrightness` | `number` | get/set via `setGbPrinterBrightness()` |
| `getBoxName(box: number)` | `string` |  |
| `getDaycareSlot(index: number)` | `Uint8Array` |  |
| `getEventFlag(flagNumber: number)` | `boolean` |  |
| `getWork(index: number)` | `number` |  |
| `hallOfFame` | `HallOfFameReader1` | get-only |
| `hallOfFameCount` | `number` | get/set via `setHallOfFameCount()` |
| `isDaycareOccupied(index: number)` | `boolean` |  |
| `isSilphLaprasReceived` | `boolean` | get/set via `setIsSilphLaprasReceived()` |
| `isVirtualConsole` | `boolean` | get-only |
| `japanese` | `boolean` | readonly (computed) |
| `korean` | `boolean` | readonly (computed) |
| `originalTrainerTrash` | `Uint8Array` | get/set via `setOriginalTrainerTrash()` |
| `pikaBeachScore` | `number` | get/set via `setPikaBeachScore()` |
| `pikaFriendship` | `number` | get/set via `setPikaFriendship()` |
| `playedFrames` | `number` | get/set via `setPlayedFrames()` |
| `playedMaximum` | `boolean` | get/set via `setPlayedMaximum()` |
| `rivalName` | `string` | get/set via `setRivalName()` |
| `rivalNameTrash` | `Uint8Array` | get/set via `setRivalNameTrash()` |
| `rivalStarter` | `number` | get/set via `setRivalStarter()` |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setDaycareOccupied(index: number, occupied: boolean)` | `void` |  |
| `setEventFlag(flagNumber: number, value: boolean)` | `void` |  |
| `setWork(index: number, value: number)` | `void` |  |
| `sound` | `number` | get/set via `setSound()` |
| `starter` | `number` | get/set via `setStarter()` |
| `textSpeed` | `number` | get/set via `setTextSpeed()` |
| `wramd72e` | `number` | get-only |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `isYellow(data: Uint8Array, japanese: boolean)` | `boolean` |  |
| `isYellowint(data: Uint8Array)` | `boolean` |  |
| `isYellowjpn(data: Uint8Array)` | `boolean` |  |

### `SAV1Stadium`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `fixStoragePreWrite()` | `boolean` |  |
| `getTeamName(team: number)` | `string` |  |
| `getTeamOffset(type: "Anything_Goes" | "Little_Cup" | "Poke_Cup" | "Prime_Cup" | "GymLeader_Castle" | "Vs_Rival", team: number)` | `number` |  |
| `getTeamOffset(team: number)` | `number` |  |
| `isUsingBackupBoxSlots` | `boolean` | get/set via `setIsUsingBackupBoxSlots()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `isHeaderValid(header: Uint8Array, footer: Uint8Array, japanese: boolean)` | `boolean` |  |
| `isStadium(data: Uint8Array)` | `boolean` |  |

### `SAV1StadiumJ`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getTeamName(team: number)` | `string` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getTeamOffset(team: number)` | `number` |  |
| `isStadium(data: Uint8Array)` | `boolean` |  |

### `SAV2`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `badges` | `number` | get/set via `setBadges()` |
| `battleEffects` | `boolean` | get/set via `setBattleEffects()` |
| `battleStyleSwitch` | `boolean` | get/set via `setBattleStyleSwitch()` |
| `blueCardPoints` | `number` | get/set via `setBlueCardPoints()` |
| `coin` | `number` | get/set via `setCoin()` |
| `daycareFlagByte(index: number)` | `number` |  |
| `daycareSlotCount` | `number` | get-only |
| `enablegsBallMobileEvent()` | `void` | Triggered on Virtual Console by adding Hall of Fame entry, enabling the event. |
| `eventFlagCount` | `number` | get-only |
| `eventWorkCount` | `number` | get-only |
| `gbMobileCable` | `"None" \| "Blue" \| "Yellow" \| "Green" \| "Red" \| "Purple" \| "Black" \| "Pink" \| "Gray" \| "Debug" \| "Disabled"` | get/set via `setGbMobileCable()` |
| `gbPrinterBrightness` | `number` | get/set via `setGbPrinterBrightness()` |
| `getBoxName(box: number)` | `string` |  |
| `getDaycareEgg()` | `Uint8Array` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `getEventFlag(flagNumber: number)` | `boolean` |  |
| `getWork(index: number)` | `number` |  |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `isEnabledgsBallMobileEvent` | `boolean` | get-only |
| `isgbMobileAvailable` | `boolean` | get-only |
| `isgbMobileEnabled` | `boolean` | get-only |
| `isMysteryGiftUnlocked` | `boolean` | get/set via `setIsMysteryGiftUnlocked()` |
| `isVirtualConsole` | `boolean` | get-only |
| `japanese` | `boolean` | readonly (computed) |
| `korean` | `boolean` | readonly (computed) |
| `menuAccountOn` | `boolean` | get/set via `setMenuAccountOn()` |
| `mysteryGiftItem` | `number` | get/set via `setMysteryGiftItem()` |
| `originalTrainerTrash` | `Uint8Array` | get/set via `setOriginalTrainerTrash()` |
| `palette` | `number` | get/set via `setPalette()` |
| `resetKey` | `number` | get-only |
| `resetrtc()` | `void` | Sets the "Time Not Set" flag to the RTC Flag list. |
| `rivalName` | `string` | get/set via `setRivalName()` |
| `rivalNameTrash` | `Uint8Array` | get/set via `setRivalNameTrash()` |
| `saveFileExists` | `boolean` | get/set via `setSaveFileExists()` |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |
| `setEventFlag(flagNumber: number, value: boolean)` | `void` |  |
| `setWork(index: number, value: number)` | `void` |  |
| `sound` | `number` | get/set via `setSound()` |
| `textBoxFlags` | `number` | get/set via `setTextBoxFlags()` |
| `textBoxFrame` | `number` | get/set via `setTextBoxFrame()` |
| `textBoxFrameDelay1` | `boolean` | get/set via `setTextBoxFrameDelay1()` |
| `textBoxFrameDelayNone` | `boolean` | get/set via `setTextBoxFrameDelayNone()` |
| `textSpeed` | `number` | get/set via `setTextSpeed()` |
| `unlockAllDecorations()` | `void` |  |
| `unownFirstSeen` | `number` | get/set via `setUnownFirstSeen()` — Chooses which Unown sprite to show in the regular Pokédex View |
| `unownUnlockAll()` | `void` | Unlocks all Unown letters/forms in the wild. |
| `unownUnlocked` | `number` | get/set via `setUnownUnlocked()` — Toggles the availability of Unown letter groups in the Wild |
| `unownUnlocked0` | `boolean` | get/set via `setUnownUnlocked0()` — Flag that determines if Unown Letters are available in the wild: A, B, C, D, E, F, G, H, I, J, K |
| `unownUnlocked1` | `boolean` | get/set via `setUnownUnlocked1()` — Flag that determines if Unown Letters are available in the wild: L, M, N, O, P, Q, R |
| `unownUnlocked2` | `boolean` | get/set via `setUnownUnlocked2()` — Flag that determines if Unown Letters are available in the wild: S, T, U, V, W |
| `unownUnlocked3` | `boolean` | get/set via `setUnownUnlocked3()` — Flag that determines if Unown Letters are available in the wild: X, Y, Z |

### `SAV2Stadium`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getBoxName(box: number)` | `string` |  |
| `getTeamName(team: number)` | `string` |  |
| `mailboxBlockSize` | `number` | get-only |
| `mailboxHeldBlockSize` | `number` | get-only |
| `setBoxName(box: number, name: readonly string[])` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getTeamOffset(team: number)` | `number` |  |
| `getTeamOffset(type: "Anything_Goes" | "Little_Cup" | "Poke_Cup" | "Prime_Cup" | "GymLeader_Castle" | "Vs_Rival", team: number)` | `number` |  |
| `isStadium(data: Uint8Array)` | `boolean` |  |
| `mailboxBlockOffset(language: number)` | `number` |  |
| `mailboxHeldBlockOffset(language: number)` | `number` |  |
| `mailboxHeldMailCount` | `number` | get/set via `setMailboxHeldMailCount()` |
| `mailboxMailCount` | `number` | get/set via `setMailboxMailCount()` |

### `SAV3`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `badges` | `number` | get/set via `setBadges()` |
| `coin` | `number` | get/set via `setCoin()` |
| `colosseumCoupons` | `number` | get/set via `setColosseumCoupons()` — PokéCoupons stored by Pokémon Colosseum and XD from Mt. Battle runs. Earned PokéCoupons are also added to . |
| `colosseumCouponsTotal` | `number` | get/set via `setColosseumCouponsTotal()` — Used by the JP Colosseum bonus disc. Determines PokéCoupon rank to distribute rewards. Unread in International games. |
| `colosseumPokeCouponTitleBronze` | `boolean` | get/set via `setColosseumPokeCouponTitleBronze()` — PP Max from JP Colosseum Bonus Disc; for reaching 2500 |
| `colosseumPokeCouponTitleGold` | `boolean` | get/set via `setColosseumPokeCouponTitleGold()` — Master Ball from JP Colosseum Bonus Disc; for reaching 30,000 |
| `colosseumPokeCouponTitleSilver` | `boolean` | get/set via `setColosseumPokeCouponTitleSilver()` — Light Ball Pikachu from JP Colosseum Bonus Disc; for reaching 5000 |
| `colosseumRaw1` | `number` | get/set via `setColosseumRaw1()` |
| `colosseumRaw2` | `number` | get/set via `setColosseumRaw2()` |
| `colosseumReceivedAgeto` | `boolean` | get/set via `setColosseumReceivedAgeto()` — Received Celebi Gift from JP Colosseum Bonus Disc |
| `daycareSlotCount` | `number` | get-only |
| `eberryName` | `string` | get-only |
| `eventFlagCount` | `number` | get-only |
| `eventWorkCount` | `number` | get-only |
| `forceLoad(version: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid")` | `SAV3` |  |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getDaycareexp(index: number)` | `number` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `getDaycareSlotOffset(slot: number)` | `number` |  |
| `getEreaderData()` | `Uint8Array` | Only used by Japanese Emerald games. |
| `getEventFlag(flagNumber: number)` | `boolean` |  |
| `getFinalExternalData()` | `Uint8Array` | Only used in Emerald for storing the Battle Video. |
| `getHallOfFameData()` | `Uint8Array` | Hall of Fame data is split across two sectors. |
| `getRecord(record: number)` | `number` |  |
| `getWork(index: number)` | `number` |  |
| `giftRibbons` | `Uint8Array` | get-only |
| `giftRibbonsClear()` | `void` |  |
| `giftRibbonsImport(trade: Uint8Array)` | `void` |  |
| `hasReceivedWishmkrJirachi` | `boolean` | get/set via `setHasReceivedWishmkrJirachi()` — Received Jirachi Gift from Colosseum Bonus Disc |
| `hasUsedrsbox` | `boolean` | get/set via `setHasUsedrsbox()` — Indicates if this save has connected to RSBOX and triggered the free False Swipe Swablu Egg giveaway. |
| `isCorruptPokedexff()` | `boolean` |  |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `isEberryEngima` | `boolean` | get-only |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `isFullSaveFile` | `boolean` | get-only — Indicates if the extdata sections of the save file are available for get/set. |
| `isMisconfiguredSize` | `boolean` | get-only — Indicates if the save file was a misconfigured (smaller) size, and thus not all extra blocks may be present. |
| `isVirtualConsole` | `boolean` | get-only |
| `japanese` | `boolean` | readonly (computed) |
| `korean` | `boolean` | readonly (computed) |
| `large` | `Uint8Array` | get-only |
| `largeBlock` | `ISaveBlock3Large` | get-only |
| `largeBuffer` | `Uint8Array` | get/set via `setLargeBuffer()` |
| `mirrorSeenFlags()` | `void` | In Gen 3, the seen flags are stored in three different places. Mirror them to each other to ensure consistency. |
| `nationalDex` | `boolean` | get/set via `setNationalDex()` |
| `rsBoxDepositEggsUnlocked` | `number` | get/set via `setRsBoxDepositEggsUnlocked()` — 1 for ExtremeSpeed Zigzagoon (at 100 deposited), 2 for Pay Day Skitty (at 500 deposited), 3 for Surf Pichu (at 1499 deposited) |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setDaycareexp(index: number, value: number)` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |
| `setEventFlag(flagNumber: number, value: boolean)` | `void` |  |
| `setHallOfFameData(value: Uint8Array)` | `void` |  |
| `setRecord(record: number, value: number)` | `void` |  |
| `setWork(index: number, value: number)` | `void` |  |
| `small` | `Uint8Array` | get-only |
| `smallBlock` | `ISaveBlock3Small` | get-only |
| `smallBuffer` | `Uint8Array` | get/set via `setSmallBuffer()` |
| `storage` | `Uint8Array` | get-only |
| `storageBuffer` | `Uint8Array` | get/set via `setStorageBuffer()` |
| `writeBothSaveSlots(data: Uint8Array)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `isAllMainSectorsPresent(data: Uint8Array, slot: number, sector0: number)` | `boolean` |  |
| `isMail(itemID: number)` | `boolean` |  |
| `isVirtualConsoleFileName(s: string)` | `boolean` |  |
| `sizeSectorUsed` | `number` | get/set via `setSizeSectorUsed()` |

### `SAV3Colosseum`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `coupons` | `number` | get/set via `setCoupons()` |
| `couponsTotal` | `number` | get/set via `setCouponsTotal()` |
| `currentRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setCurrentRegion()` |
| `daycareDepositLevel` | `number` | get/set via `setDaycareDepositLevel()` |
| `daycareSlotCount` | `number` | get-only |
| `gcGameIndex` | `"None" \| "FR" \| "LG" \| "S" \| "R" \| "E" \| "CXD"` | get/set via `setGcGameIndex()` |
| `gcLanguage` | `"Hacked" \| "Japanese" \| "English" \| "German" \| "French" \| "Italian" \| "Spanish" \| "UNUSED_6"` | get/set via `setGcLanguage()` |
| `getBoxName(box: number)` | `string` |  |
| `getDaycareexp(index: number)` | `number` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `memoryCard` | `SAV3GCMemoryCard` | get/set via `setMemoryCard()` |
| `ot2` | `string` | get/set via `setOt2()` |
| `originalRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setOriginalRegion()` |
| `originalTrainerTrash` | `Uint8Array` | get-only |
| `pokeCouponTitleBronze` | `boolean` | get/set via `setPokeCouponTitleBronze()` — Received PP Max from JP Colosseum Bonus Disc; for reaching 2,500 |
| `pokeCouponTitleGold` | `boolean` | get/set via `setPokeCouponTitleGold()` — Received Master Ball from JP Colosseum Bonus Disc; for reaching 30,000 |
| `pokeCouponTitleSilver` | `boolean` | get/set via `setPokeCouponTitleSilver()` — Received Light Ball Pikachu from JP Colosseum Bonus Disc; for reaching 5,000 |
| `ruiName` | `string` | get/set via `setRuiName()` |
| `receivedAgeto` | `boolean` | get/set via `setReceivedAgeto()` — Received Celebi Gift from JP Colosseum Bonus Disc |
| `receivedAgetogba` | `number` | get/set via `setReceivedAgetogba()` — Used by the JP Colosseum Bonus Disc. Records how many Celebi have been sent to a GBA game. |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setDaycareexp(index: number, value: number)` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `maxShadowid` | `number` | get/set via `setMaxShadowid()` |

### `SAV3E`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleVideo` | `BattleVideo3` | get/set via `setBattleVideo()` |
| `battleVideoData` | `Uint8Array` | get-only |
| `hasBattleVideo` | `boolean` | get-only |
| `setExtraDataSentinelBattleVideo()` | `void` |  |

### `SAV3FRLG`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `resetPersonal(g: "Any" | "S" | "R" | "E" | "FR" | "LG" | "HG" | "SS" | "D" | "P" | "Pt" | "CXD" | "BATREV" | "W" | "B" | "W2" | "B2" | "X" | "Y" | "AS" | "OR" | "SN" | "MN" | "US" | "UM" | "GO" | "RD" | "GN" | "BU" | "YW" | "GD" | "SI" | "C" | "GP" | "GE" | "SW" | "SH" | "PLA" | "BD" | "SP" | "SL" | "VL" | "ZA" | "CP" | "RB" | "RBY" | "GS" | "GSC" | "RS" | "RSE" | "FRLG" | "RSBOX" | "COLO" | "XD" | "DP" | "DPPt" | "HGSS" | "BW" | "B2W2" | "XY" | "ORASDEMO" | "ORAS" | "SM" | "USUM" | "GG" | "SWSH" | "BDSP" | "SV" | "Gen1" | "Gen2" | "Gen3" | "Gen4" | "Gen5" | "Gen6" | "Gen7" | "Gen7b" | "Gen8" | "Gen9" | "StadiumJ" | "Stadium" | "Stadium2" | "EFL" | "Invalid")` | `boolean` |  |
| `rivalName` | `string` | get/set via `setRivalName()` |

### `SAV3RS`

*kind: class · extends `SaveFile`.*

### `SAV3RSBox`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `memoryCard` | `SAV3GCMemoryCard` | get/set via `setMemoryCard()` |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `boxNamePrefix` | `number` | get/set via `setBoxNamePrefix()` |

### `SAV3XD`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `coupons` | `number` | get/set via `setCoupons()` |
| `currentRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setCurrentRegion()` |
| `daycareDepositLevel` | `number` | get/set via `setDaycareDepositLevel()` |
| `daycareSlotCount` | `number` | get-only |
| `gcGameIndex` | `"None" \| "FR" \| "LG" \| "S" \| "R" \| "E" \| "CXD"` | get/set via `setGcGameIndex()` |
| `gcLanguage` | `"Hacked" \| "Japanese" \| "English" \| "German" \| "French" \| "Italian" \| "Spanish" \| "UNUSED_6"` | get/set via `setGcLanguage()` |
| `getBoxName(box: number)` | `string` |  |
| `getDaycareexp(index: number)` | `number` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `maxShadowid` | `number` | get-only |
| `memoryCard` | `SAV3GCMemoryCard` | get/set via `setMemoryCard()` |
| `ofsPouch` | `number` | get/set via `setOfsPouch()` |
| `originalRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setOriginalRegion()` |
| `originalTrainerTrash` | `Uint8Array` | get-only |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setDaycareexp(index: number, value: number)` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |

### `SAV4`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `bp` | `number` | get/set via `setBp()` |
| `badges` | `number` | get/set via `setBadges()` |
| `battleTowerSeed` | `number` | get/set via `setBattleTowerSeed()` |
| `chatter` | `Chatter4` | get-only |
| `coin` | `number` | get/set via `setCoin()` |
| `country` | `number` | get/set via `setCountry()` |
| `daycareSlotCount` | `number` | get-only |
| `daycareStepCounter` | `number` | get/set via `setDaycareStepCounter()` |
| `dex` | `Zukan4` | get-only |
| `dexUpgraded` | `number` | get/set via `setDexUpgraded()` |
| `eventFlagCount` | `number` | get-only |
| `eventWorkCount` | `number` | get-only |
| `gts` | `number` | get/set via `setGts()` |
| `gameClear` | `boolean` | get/set via `setGameClear()` |
| `general` | `Uint8Array` | get-only |
| `geonet` | `number` | get/set via `setGeonet()` |
| `geonetGlobalFlag` | `boolean` | get/set via `setGeonetGlobalFlag()` |
| `getAccessoryOwnedCount(accessory: "WhiteFluff" | "YellowFluff" | "PinkFluff" | "BrownFluff" | "BlackFluff" | "OrangeFluff" | "RoundPebble" | "GlitterBoulder" | "SnaggyPebble" | "JaggedBoulder" | "BlackPebble" | "MiniPebble" | "PinkScale" | "BlueScale" | "GreenScale" | "PurpleScale" | "BigScale" | "NarrowScale" | "BlueFeather" | "RedFeather" | "YellowFeather" | "WhiteFeather" | "BlackMoustache" | "WhiteMoustache" | "BlackBeard" | "WhiteBeard" | "SmallLeaf" | "BigLeaf" | "NarrowLeaf" | "ShedClaw" | "ShedHorn" | "ThinMushroom" | "ThickMushroom" | "Stump" | "PrettyDewdrop" | "SnowCrystal" | "Sparks" | "ShimmeringFire" | "MysticFire" | "Determination" | "PeculiarSpoon" | "PuffySmoke" | "PoisonExtract" | "WealthyCoin" | "EerieThing" | "Spring" | "Seashell" | "HummingNote" | "ShinyPowder" | "GlitterPowder" | "RedFlower" | "PinkFlower" | "WhiteFlower" | "BlueFlower" | "OrangeFlower" | "YellowFlower" | "GooglySpecs" | "BlackSpecs" | "GorgeousSpecs" | "SweetCandy" | "Confetti" | "ColoredParasol" | "OldUmbrella" | "Spotlight" | "Cape" | "StandingMike" | "Surfboard" | "Carpet" | "RetroPipe" | "FluffyBed" | "MirrorBall" | "PhotoBoard" | "PinkBarrette" | "RedBarrette" | "BlueBarrette" | "YellowBarrette" | "GreenBarrette" | "PinkBalloon" | "RedBalloons" | "BlueBalloons" | "YellowBalloon" | "GreenBalloons" | "LaceHeadress" | "TopHat" | "SilkVeil" | "HeroicHeadband" | "ProfessorHat" | "FlowerStage" | "GoldPedestal" | "GlassStage" | "AwardPodium" | "CubeStage" | "TURTWIGMask" | "CHIMCHARMask" | "PIPLUPMask" | "BigTree" | "Flag" | "Crown" | "Tiara" | "Comet")` | `number` |  |
| `getBackdropPosition(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset")` | `number` |  |
| `getBackdropUnlocked(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset")` | `boolean` |  |
| `getBattleVideo(index: number)` | `BattleVideo4` |  |
| `getDaycareexp(index: number)` | `number` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `getEventFlag(flagNumber: number)` | `boolean` |  |
| `getHall()` | `Hall4` |  |
| `getMail(mailIndex: number)` | `Mail4` |  |
| `getMailData(ofs: number)` | `Uint8Array` |  |
| `getMailOffset(index: number)` | `number` |  |
| `getSealCase()` | `Uint8Array` |  |
| `getSealCount(id: "HeartA" | "HeartB" | "HeartC" | "HeartD" | "HeartE" | "HeartF" | "StarA" | "StarB" | "StarC" | "StarD" | "StarE" | "StarF" | "LineA" | "LineB" | "LineC" | "LineD" | "SmokeA" | "SmokeB" | "SmokeC" | "SmokeD" | "ElectricA" | "ElectricB" | "ElectricC" | "ElectricD" | "FoamyA" | "FoamyB" | "FoamyC" | "FoamyD" | "FireA" | "FireB" | "FireC" | "FireD" | "PartyA" | "PartyB" | "PartyC" | "PartyD" | "FloraA" | "FloraB" | "FloraC" | "FloraD" | "FloraE" | "FloraF" | "SongA" | "SongB" | "SongC" | "SongD" | "SongE" | "SongF" | "SongG" | "LetterA" | "LetterB" | "LetterC" | "LetterD" | "LetterE" | "LetterF" | "LetterG" | "LetterH" | "LetterI" | "LetterJ" | "LetterK" | "LetterL" | "LetterM" | "LetterN" | "LetterO" | "LetterP" | "LetterQ" | "LetterR" | "LetterS" | "LetterT" | "LetterU" | "LetterV" | "LetterW" | "LetterX" | "LetterY" | "LetterZ" | "Shock" | "Mystery" | "Liquid" | "MAXLEGAL" | "Burst" | "Twinkle" | "MAX")` | `number` |  |
| `getWork(index: number)` | `number` |  |
| `groupActive` | `Group4` | get-only |
| `groupOther1` | `Group4` | get-only |
| `groupOther2` | `Group4` | get-only |
| `groupOther3` | `Group4` | get-only |
| `groupOther4` | `Group4` | get-only |
| `groupPlayer` | `Group4` | get-only — The game stores an array of 6 groups: [0] is the group created by the player (empty if the player has never created one) [1] is the group the player is currently in (controls swarms, Great Marsh, Feebas etc.) Unnamed default group if the player has never joined one [2] through [5] are groups created by other players, imported via record mixing. These are joinable via the group NPC |
| `isDaycareOccupied(index: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `isMysteryGiftUnlocked` | `boolean` | get/set via `setIsMysteryGiftUnlocked()` |
| `lottery` | `number` | get/set via `setLottery()` |
| `m` | `number` | get/set via `setM()` |
| `magic` | `number` | get/set via `setMagic()` |
| `maxFacility` | `"Tower" \| "Factory" \| "Hall" \| "Castle" \| "Arcade"` | get-only |
| `mystery` | `MysteryBlock4` | get-only |
| `nationalDex` | `boolean` | get/set via `setNationalDex()` |
| `originalTrainerTrash` | `Uint8Array` | get-only |
| `progressFlags` | `number` | get/set via `setProgressFlags()` |
| `romCode` | `number` | get/set via `setRomCode()` |
| `records` | `Record4` | get-only |
| `region` | `number` | get/set via `setRegion()` |
| `removeBackdrop(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset")` | `void` |  |
| `rivalName` | `string` | get/set via `setRivalName()` |
| `rivalNameTrash` | `Uint8Array` | get/set via `setRivalNameTrash()` |
| `setAccessoryOwnedCount(accessory: "WhiteFluff" | "YellowFluff" | "PinkFluff" | "BrownFluff" | "BlackFluff" | "OrangeFluff" | "RoundPebble" | "GlitterBoulder" | "SnaggyPebble" | "JaggedBoulder" | "BlackPebble" | "MiniPebble" | "PinkScale" | "BlueScale" | "GreenScale" | "PurpleScale" | "BigScale" | "NarrowScale" | "BlueFeather" | "RedFeather" | "YellowFeather" | "WhiteFeather" | "BlackMoustache" | "WhiteMoustache" | "BlackBeard" | "WhiteBeard" | "SmallLeaf" | "BigLeaf" | "NarrowLeaf" | "ShedClaw" | "ShedHorn" | "ThinMushroom" | "ThickMushroom" | "Stump" | "PrettyDewdrop" | "SnowCrystal" | "Sparks" | "ShimmeringFire" | "MysticFire" | "Determination" | "PeculiarSpoon" | "PuffySmoke" | "PoisonExtract" | "WealthyCoin" | "EerieThing" | "Spring" | "Seashell" | "HummingNote" | "ShinyPowder" | "GlitterPowder" | "RedFlower" | "PinkFlower" | "WhiteFlower" | "BlueFlower" | "OrangeFlower" | "YellowFlower" | "GooglySpecs" | "BlackSpecs" | "GorgeousSpecs" | "SweetCandy" | "Confetti" | "ColoredParasol" | "OldUmbrella" | "Spotlight" | "Cape" | "StandingMike" | "Surfboard" | "Carpet" | "RetroPipe" | "FluffyBed" | "MirrorBall" | "PhotoBoard" | "PinkBarrette" | "RedBarrette" | "BlueBarrette" | "YellowBarrette" | "GreenBarrette" | "PinkBalloon" | "RedBalloons" | "BlueBalloons" | "YellowBalloon" | "GreenBalloons" | "LaceHeadress" | "TopHat" | "SilkVeil" | "HeroicHeadband" | "ProfessorHat" | "FlowerStage" | "GoldPedestal" | "GlassStage" | "AwardPodium" | "CubeStage" | "TURTWIGMask" | "CHIMCHARMask" | "PIPLUPMask" | "BigTree" | "Flag" | "Crown" | "Tiara" | "Comet", count: number)` | `void` |  |
| `setBackdropPosition(backdrop: "DressUp" | "Ranch" | "CityatNight" | "SnowyTown" | "Fiery" | "OuterSpace" | "Desert" | "CumulusCloud" | "FlowerPatch" | "FutureRoom" | "OpenSea" | "TotalDarkness" | "TatamiRoom" | "GingerbreadRoom" | "Seafloor" | "Underground" | "Sky" | "Theater" | "Unset", position: number)` | `void` |  |
| `setDaycareexp(index: number, value: number)` | `void` |  |
| `setDaycareOccupied(index: number, occupied: boolean)` | `void` |  |
| `setEventFlag(flagNumber: number, value: boolean)` | `void` |  |
| `setSealCase(value: Uint8Array)` | `void` |  |
| `setSealCount(id: "HeartA" | "HeartB" | "HeartC" | "HeartD" | "HeartE" | "HeartF" | "StarA" | "StarB" | "StarC" | "StarD" | "StarE" | "StarF" | "LineA" | "LineB" | "LineC" | "LineD" | "SmokeA" | "SmokeB" | "SmokeC" | "SmokeD" | "ElectricA" | "ElectricB" | "ElectricC" | "ElectricD" | "FoamyA" | "FoamyB" | "FoamyC" | "FoamyD" | "FireA" | "FireB" | "FireC" | "FireD" | "PartyA" | "PartyB" | "PartyC" | "PartyD" | "FloraA" | "FloraB" | "FloraC" | "FloraD" | "FloraE" | "FloraF" | "SongA" | "SongB" | "SongC" | "SongD" | "SongE" | "SongF" | "SongG" | "LetterA" | "LetterB" | "LetterC" | "LetterD" | "LetterE" | "LetterF" | "LetterG" | "LetterH" | "LetterI" | "LetterJ" | "LetterK" | "LetterL" | "LetterM" | "LetterN" | "LetterO" | "LetterP" | "LetterQ" | "LetterR" | "LetterS" | "LetterT" | "LetterU" | "LetterV" | "LetterW" | "LetterX" | "LetterY" | "LetterZ" | "Shock" | "Mystery" | "Liquid" | "MAXLEGAL" | "Burst" | "Twinkle" | "MAX", count: number)` | `void` |  |
| `setWork(index: number, value: number)` | `void` |  |
| `sprite` | `number` | get/set via `setSprite()` |
| `swarmIndex` | `number` | get/set via `setSwarmIndex()` |
| `swarmMaxCountModulo` | `number` | get-only |
| `swarmSeed` | `number` | get/set via `setSwarmSeed()` |
| `x` | `number` | get/set via `setX()` |
| `x2` | `number` | get/set via `setX2()` |
| `y` | `number` | get/set via `setY()` |
| `y2` | `number` | get/set via `setY2()` |
| `z` | `number` | get/set via `setZ()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `magicJapanIntl` | `number` | get/set via `setMagicJapanIntl()` |
| `magicKorean` | `number` | get/set via `setMagicKorean()` |
| `sealMaxCount` | `number` | get/set via `setSealMaxCount()` |

### `SAV4BR`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `brLanguage` | `"JapaneseOrEnglish" \| "German" \| "Spanish" \| "French" \| "Italian"` | get/set via `setBrLanguage()` |
| `battlePasses` | `BattlePassAccessor` | get-only |
| `birthDay` | `string` | get/set via `setBirthDay()` |
| `birthDayTrash` | `Uint8Array` | get-only |
| `birthMonth` | `string` | get/set via `setBirthMonth()` |
| `birthMonthTrash` | `Uint8Array` | get-only |
| `country` | `number` | get/set via `setCountry()` |
| `currentot` | `string` | get/set via `setCurrentot()` |
| `currentSlot` | `number` | get/set via `setCurrentSlot()` |
| `findSlot(pk: PKM)` | `readonly [number, number]` |  |
| `gearShinyElectivireOutfit` | `boolean` | get/set via `setGearShinyElectivireOutfit()` |
| `gearShinyGroudonOutfit` | `boolean` | get/set via `setGearShinyGroudonOutfit()` |
| `gearShinyKyogreOutfit` | `boolean` | get/set via `setGearShinyKyogreOutfit()` |
| `gearShinyLucarioOutfit` | `boolean` | get/set via `setGearShinyLucarioOutfit()` |
| `gearShinyPachirisuOutfit` | `boolean` | get/set via `setGearShinyPachirisuOutfit()` |
| `gearShinyRoseradeOutfit` | `boolean` | get/set via `setGearShinyRoseradeOutfit()` |
| `gearUnlock` | `GearUnlock` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `japanese` | `boolean` | readonly (computed) |
| `playerid` | `bigint` | get/set via `setPlayerid()` — Used to identify which save file created a given Battle Pass. |
| `recordColosseumBattles` | `number` | get/set via `setRecordColosseumBattles()` |
| `recordCourtyardColosseumClears` | `number` | get/set via `setRecordCourtyardColosseumClears()` |
| `recordCrystalColosseumClears` | `number` | get/set via `setRecordCrystalColosseumClears()` |
| `recordFreeBattles` | `number` | get/set via `setRecordFreeBattles()` |
| `recordGatewayColosseumClears` | `number` | get/set via `setRecordGatewayColosseumClears()` |
| `recordMagmaColosseumClears` | `number` | get/set via `setRecordMagmaColosseumClears()` |
| `recordMainStreetColosseumClears` | `number` | get/set via `setRecordMainStreetColosseumClears()` |
| `recordNeonColosseumClears` | `number` | get/set via `setRecordNeonColosseumClears()` |
| `recordStargazerColosseumClears` | `number` | get/set via `setRecordStargazerColosseumClears()` |
| `recordSunnyParkColosseumClears` | `number` | get/set via `setRecordSunnyParkColosseumClears()` |
| `recordSunsetColosseumClears` | `number` | get/set via `setRecordSunsetColosseumClears()` |
| `recordTotalBattles` | `number` | get/set via `setRecordTotalBattles()` |
| `recordWaterfallColosseumClears` | `number` | get/set via `setRecordWaterfallColosseumClears()` |
| `recordWiFiBattles` | `number` | get/set via `setRecordWiFiBattles()` |
| `region` | `number` | get/set via `setRegion()` |
| `saveNames` | `readonly string[]` | get/set via `setSaveNames()` |
| `selfIntroduction` | `string` | get/set via `setSelfIntroduction()` — The self-introduction in the player's profile. |
| `selfIntroductionTrash` | `Uint8Array` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `unlockedCourtyardColosseum` | `boolean` | get/set via `setUnlockedCourtyardColosseum()` |
| `unlockedCrystalColosseum` | `boolean` | get/set via `setUnlockedCrystalColosseum()` |
| `unlockedGatewayColosseum` | `boolean` | get/set via `setUnlockedGatewayColosseum()` |
| `unlockedMagmaColosseum` | `boolean` | get/set via `setUnlockedMagmaColosseum()` |
| `unlockedMainStreetColosseum` | `boolean` | get/set via `setUnlockedMainStreetColosseum()` |
| `unlockedNeonColosseum` | `boolean` | get/set via `setUnlockedNeonColosseum()` |
| `unlockedPostGame` | `boolean` | get/set via `setUnlockedPostGame()` |
| `unlockedStargazerColosseum` | `boolean` | get/set via `setUnlockedStargazerColosseum()` |
| `unlockedSunnyParkColosseum` | `boolean` | get/set via `setUnlockedSunnyParkColosseum()` |
| `unlockedSunsetColosseum` | `boolean` | get/set via `setUnlockedSunsetColosseum()` |
| `unlockedWaterfallColosseum` | `boolean` | get/set via `setUnlockedWaterfallColosseum()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `decrypt(input: Uint8Array)` | `void` |  |
| `isChecksumsValid(sav: Uint8Array)` | `boolean` |  |
| `isValidSaveFile(data: Uint8Array)` | `boolean` |  |
| `sizeHalf` | `number` | get/set via `setSizeHalf()` |
| `verifyChecksum(input: Uint8Array, offset: number, len: number, chkOffset: number)` | `boolean` |  |

### `SAV4DP`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `roamerCresselia` | `Roamer4` | get-only |
| `roamerMesprit` | `Roamer4` | get-only |
| `roamerUnused` | `Roamer4` | get-only |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `generalSize` | `number` | get/set via `setGeneralSize()` |

### `SAV4HGSS`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `badges16` | `number` | get/set via `setBadges16()` |
| `flagsBoxContentChanged` | `number` | get/set via `setFlagsBoxContentChanged()` — The box structure stores bitflags to indicate which boxes have changed; used when saving to skip unchanged boxes. |
| `getApricornCount(index: number)` | `number` |  |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getCallerAtIndex(index: number)` | `"None" \| "Mother" \| "Professor_Elm" \| "Professor_Oak" \| "Ethan" \| "Lyra" \| "Kurt" \| "Daycare_Man" \| "Daycare_Lady" \| "Buena" \| "Bill" \| "Joey" \| "Ralph" \| "Liz" \| "Wade" \| "Anthony" \| "Bike_Shop" \| "Kenji" \| "Whitney" \| "Falkner" \| "Jack" \| "Chad" \| "Brent" \| "Todd" \| "Arnie" \| "Baoba" \| "Irwin" \| "Janine" \| "Clair" \| "Erika" \| "Misty" \| "Blaine" \| "Blue" \| "Chuck" \| "Brock" \| "Bugsy" \| "Sabrina" \| "Lieutenant_Surge" \| "Morty" \| "Jasmine" \| "Pryce" \| "Huey" \| "Gaven" \| "Jamie" \| "Reena" \| "Vance" \| "Parry" \| "Erin" \| "Beverly" \| "Jose" \| "Gina" \| "Alan" \| "Dana" \| "Derek" \| "Tully" \| "Tiffany" \| "Wilton" \| "Krise" \| "Ian" \| "Walt" \| "Alfred" \| "Doug" \| "Rob" \| "Kyle" \| "Kyler" \| "Tim_and_Sue" \| "Kenny" \| "Tanner" \| "Josh" \| "Torin" \| "Hillary" \| "Billy" \| "Kay_and_Tia" \| "Reese" \| "Aiden" \| "Ernest"` |  |
| `getPokeGearRoloDex()` | `readonly ("None" \| "Mother" \| "Professor_Elm" \| "Professor_Oak" \| "Ethan" \| "Lyra" \| "Kurt" \| "Daycare_Man" \| "Daycare_Lady" \| "Buena" \| "Bill" \| "Joey" \| "Ralph" \| "Liz" \| "Wade" \| "Anthony" \| "Bike_Shop" \| "Kenji" \| "Whitney" \| "Falkner" \| "Jack" \| "Chad" \| "Brent" \| "Todd" \| "Arnie" \| "Baoba" \| "Irwin" \| "Janine" \| "Clair" \| "Erika" \| "Misty" \| "Blaine" \| "Blue" \| "Chuck" \| "Brock" \| "Bugsy" \| "Sabrina" \| "Lieutenant_Surge" \| "Morty" \| "Jasmine" \| "Pryce" \| "Huey" \| "Gaven" \| "Jamie" \| "Reena" \| "Vance" \| "Parry" \| "Erin" \| "Beverly" \| "Jose" \| "Gina" \| "Alan" \| "Dana" \| "Derek" \| "Tully" \| "Tiffany" \| "Wilton" \| "Krise" \| "Ian" \| "Walt" \| "Alfred" \| "Doug" \| "Rob" \| "Kyle" \| "Kyler" \| "Tim_and_Sue" \| "Kenny" \| "Tanner" \| "Josh" \| "Torin" \| "Hillary" \| "Billy" \| "Kay_and_Tia" \| "Reese" \| "Aiden" \| "Ernest")[]` |  |
| `getPokewalkerCoursesUnlocked(value: readonly boolean[])` | `void` |  |
| `lockCapsuleSlot` | `PCD` | get/set via `setLockCapsuleSlot()` |
| `mapUnlockState` | `"Johto" \| "JohtoPlus" \| "JohtoKanto" \| "Invalid"` | get/set via `setMapUnlockState()` |
| `pokeGearClearAllCallers(start: number)` | `void` |  |
| `pokeGearUnlockAllCallers()` | `void` |  |
| `pokeGearUnlockAllCallersNoTrainers()` | `void` |  |
| `pokeathlon` | `Pokeathlon4` | get-only |
| `pokewalkerCoursesSetAll(bitFlags: number)` | `void` |  |
| `pokewalkerCoursesUnlockAll()` | `void` | Unlocks all Pokéwalker courses -- be nice and unlock all even if not available for the save file's language. |
| `pokewalkerCoursesUnlockNone()` | `void` |  |
| `pokewalkerSteps` | `number` | get/set via `setPokewalkerSteps()` |
| `pokewalkerWatts` | `number` | get/set via `setPokewalkerWatts()` |
| `roamerEntei` | `Roamer4` | get-only |
| `roamerLatias` | `Roamer4` | get-only |
| `roamerLatios` | `Roamer4` | get-only |
| `roamerRaikou` | `Roamer4` | get-only |
| `setApricornCount(index: number, count: number)` | `void` |  |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setCallerAtIndex(index: number, caller: "None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest")` | `void` |  |
| `setPokeGearRoloDex(value: readonly ("None" | "Mother" | "Professor_Elm" | "Professor_Oak" | "Ethan" | "Lyra" | "Kurt" | "Daycare_Man" | "Daycare_Lady" | "Buena" | "Bill" | "Joey" | "Ralph" | "Liz" | "Wade" | "Anthony" | "Bike_Shop" | "Kenji" | "Whitney" | "Falkner" | "Jack" | "Chad" | "Brent" | "Todd" | "Arnie" | "Baoba" | "Irwin" | "Janine" | "Clair" | "Erika" | "Misty" | "Blaine" | "Blue" | "Chuck" | "Brock" | "Bugsy" | "Sabrina" | "Lieutenant_Surge" | "Morty" | "Jasmine" | "Pryce" | "Huey" | "Gaven" | "Jamie" | "Reena" | "Vance" | "Parry" | "Erin" | "Beverly" | "Jose" | "Gina" | "Alan" | "Dana" | "Derek" | "Tully" | "Tiffany" | "Wilton" | "Krise" | "Ian" | "Walt" | "Alfred" | "Doug" | "Rob" | "Kyle" | "Kyler" | "Tim_and_Sue" | "Kenny" | "Tanner" | "Josh" | "Torin" | "Hillary" | "Billy" | "Kay_and_Tia" | "Reese" | "Aiden" | "Ernest")[])` | `void` |  |
| `setPokewalkerCoursesUnlocked(value: readonly boolean[])` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `generalSize` | `number` | get/set via `setGeneralSize()` |
| `getPossiblePokewalkerCourseUnlock(language: number)` | `number` |  |
| `pokewalkerCourseFlagCount` | `number` | get/set via `setPokewalkerCourseFlagCount()` |
| `walkerPair` | `number` | get/set via `setWalkerPair()` |

### `SAV4Pt`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getToughWordUnlocked(word: "EarthTones" | "Implant" | "GoldenRatio" | "Omnibus" | "Starboard" | "MoneyRate" | "Resolution" | "Cadenza" | "Education" | "Cubism" | "CrossStitch" | "Artery" | "BoneDensity" | "Gommage" | "Streaming" | "Conductivity" | "Copyright" | "TwoStep" | "Contour" | "Neutrino" | "Howling" | "Spreadsheet" | "GMT" | "Irritability" | "Fractals" | "Flambe" | "StockPrices" | "PHBalance" | "Vector" | "Polyphenol" | "Ubiquitous" | "REMSleep")` | `boolean` |  |
| `getVillaFurniturePurchased(index: "BigSofa" | "SmallSofa" | "Bed" | "NightTable" | "TV" | "AudioSystem" | "Bookshelf" | "Rack" | "Houseplant" | "PCDesk" | "MusicBox" | "PokemonBust1" | "PokemonBust2" | "Piano" | "GuestSet" | "WallClock" | "Masterpiece" | "TeaSet" | "Chandelier")` | `boolean` |  |
| `getWallpaperUnlocked(wallpaperId: "Forest" | "City" | "Desert" | "Savanna" | "Crag" | "Volcano" | "Snow" | "Cave" | "Beach" | "Seafloor" | "River" | "Sky" | "Checks" | "PokeCenter" | "Machine" | "Simple" | "Distortion" | "Contest" | "Nostalgic" | "Croagunk" | "trio" | "PikaPika" | "Legend" | "Team_Galactic")` | `boolean` |  |
| `roamerArticuno` | `Roamer4` | get-only |
| `roamerCresselia` | `Roamer4` | get-only |
| `roamerMesprit` | `Roamer4` | get-only |
| `roamerMoltres` | `Roamer4` | get-only |
| `roamerUnused` | `Roamer4` | get-only |
| `roamerZapdos` | `Roamer4` | get-only |
| `setToughWordUnlocked(word: "EarthTones" | "Implant" | "GoldenRatio" | "Omnibus" | "Starboard" | "MoneyRate" | "Resolution" | "Cadenza" | "Education" | "Cubism" | "CrossStitch" | "Artery" | "BoneDensity" | "Gommage" | "Streaming" | "Conductivity" | "Copyright" | "TwoStep" | "Contour" | "Neutrino" | "Howling" | "Spreadsheet" | "GMT" | "Irritability" | "Fractals" | "Flambe" | "StockPrices" | "PHBalance" | "Vector" | "Polyphenol" | "Ubiquitous" | "REMSleep", value: boolean)` | `void` |  |
| `setVillaFurniturePurchased(index: "BigSofa" | "SmallSofa" | "Bed" | "NightTable" | "TV" | "AudioSystem" | "Bookshelf" | "Rack" | "Houseplant" | "PCDesk" | "MusicBox" | "PokemonBust1" | "PokemonBust2" | "Piano" | "GuestSet" | "WallClock" | "Masterpiece" | "TeaSet" | "Chandelier", value: boolean)` | `void` |  |
| `setWallpaperUnlocked(wallpaperId: "Forest" | "City" | "Desert" | "Savanna" | "Crag" | "Volcano" | "Snow" | "Cave" | "Beach" | "Seafloor" | "River" | "Sky" | "Checks" | "PokeCenter" | "Machine" | "Simple" | "Distortion" | "Contest" | "Nostalgic" | "Croagunk" | "trio" | "PikaPika" | "Legend" | "Team_Galactic", value: boolean)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `generalSize` | `number` | get/set via `setGeneralSize()` |

### `SAV4Ranch`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `currentRanchLevel` | `number` | get/set via `setCurrentRanchLevel()` |
| `getRanchMii(index: number)` | `RanchMii` |  |
| `getRanchToy(index: number)` | `RanchToy` |  |
| `getRanchTrainerMii(index: number)` | `RanchTrainerMii` |  |
| `maxMiiCount` | `number` | get-only |
| `maxToyCount` | `number` | get-only |
| `maxToyid` | `number` | get-only |
| `miiCount` | `number` | get-only |
| `nextHayleyBringNationalDex` | `number` | get/set via `setNextHayleyBringNationalDex()` |
| `plannedRanchLevel` | `number` | get/set via `setPlannedRanchLevel()` |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `secondsSince2000` | `number` | get/set via `setSecondsSince2000()` |
| `setRanchMii(trainer: RanchMii, index: number)` | `void` |  |
| `setRanchToy(toy: RanchToy, index: number)` | `void` |  |
| `setRanchTrainerMii(mii: RanchTrainerMii, index: number)` | `void` |  |
| `totalSeconds` | `number` | get/set via `setTotalSeconds()` |
| `trainerMiiCount` | `number` | get-only |
| `writeBoxSlotInternal(pk: PKM, data: Uint8Array, htName: string, htTID: number, htSID: number, type: "None" | "Trainer" | "Hayley" | "Hayley_Traded")` | `void` |  |

### `SAV4Sinnoh`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `currentPoketchApp` | `number` | get/set via `setCurrentPoketchApp()` |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getHoneyTree(index: number)` | `HoneyTreeValue` |  |
| `getHoneyTreeSpecies(group: number, index: number)` | `number` |  |
| `getPoketchAppUnlocked(index: "Digital_Watch" | "Calculator" | "Memo_Pad" | "Pedometer" | "Party" | "Friendship_Checker" | "Dowsing_Machine" | "Berry_Searcher" | "Daycare" | "History" | "Counter" | "Analog_Watch" | "Marking_Map" | "Link_Searcher" | "Coin_Toss" | "Move_Tester" | "Calendar" | "Dot_Artist" | "Roulette" | "Trainer_Counter" | "Kitchen_Timer" | "Color_Changer" | "Matchup_Checker" | "Stopwatch" | "Alarm_Clock")` | `boolean` |  |
| `getPoketchDotArtistData()` | `Uint8Array` |  |
| `getSafariIndex(slot: number)` | `number` |  |
| `getugiGoods()` | `Uint8Array` |  |
| `getugiSpheres()` | `Uint8Array` | First 40 are the sphere type, last 40 are the sphere sizes |
| `getugiTraps()` | `Uint8Array` |  |
| `getugiTreasures()` | `Uint8Array` |  |
| `ofsPoffinCase` | `number` | get/set via `setOfsPoffinCase()` |
| `poketchColor` | `"Green" \| "Yellow" \| "Orange" \| "Red" \| "Purple" \| "Blue" \| "Turquoise" \| "White"` | get/set via `setPoketchColor()` |
| `poketchEnabled` | `boolean` | get/set via `setPoketchEnabled()` |
| `poketchFlag1` | `boolean` | get/set via `setPoketchFlag1()` |
| `poketchFlag2` | `boolean` | get/set via `setPoketchFlag2()` |
| `poketchFlag6` | `boolean` | get/set via `setPoketchFlag6()` |
| `poketchFlag7` | `boolean` | get/set via `setPoketchFlag7()` |
| `poketchStepCounter` | `number` | get/set via `setPoketchStepCounter()` |
| `poketchUnlockedCount` | `number` | get/set via `setPoketchUnlockedCount()` |
| `safariSeed` | `number` | get/set via `setSafariSeed()` |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setHoneyTree(tree: HoneyTreeValue, index: number)` | `void` |  |
| `setPoketchAppUnlocked(index: "Digital_Watch" | "Calculator" | "Memo_Pad" | "Pedometer" | "Party" | "Friendship_Checker" | "Dowsing_Machine" | "Berry_Searcher" | "Daycare" | "History" | "Counter" | "Analog_Watch" | "Marking_Map" | "Link_Searcher" | "Coin_Toss" | "Move_Tester" | "Calendar" | "Dot_Artist" | "Roulette" | "Trainer_Counter" | "Kitchen_Timer" | "Color_Changer" | "Matchup_Checker" | "Stopwatch" | "Alarm_Clock", value: boolean)` | `void` |  |
| `setPoketchDotArtistData(value: Uint8Array)` | `void` |  |
| `setSafariIndex(slot: number, value: number)` | `void` |  |
| `ugFlagsCaptured` | `number` | get/set via `setUgFlagsCaptured()` |
| `ugFlagsFromMe` | `number` | get/set via `setUgFlagsFromMe()` |
| `ugFlagsRecovered` | `number` | get/set via `setUgFlagsRecovered()` |
| `ugFlagsTaken` | `number` | get/set via `setUgFlagsTaken()` |
| `ugFossils` | `number` | get/set via `setUgFossils()` |
| `ugGiftsGiven` | `number` | get/set via `setUgGiftsGiven()` |
| `ugGiftsReceived` | `number` | get/set via `setUgGiftsReceived()` |
| `ugHelpedOthers` | `number` | get/set via `setUgHelpedOthers()` |
| `ugMyBaseMoved` | `number` | get/set via `setUgMyBaseMoved()` |
| `ugPeopleMet` | `number` | get/set via `setUgPeopleMet()` |
| `ugSpheres` | `number` | get/set via `setUgSpheres()` |
| `ugTrapPlayers` | `number` | get/set via `setUgTrapPlayers()` |
| `ugTrapSelf` | `number` | get/set via `setUgTrapSelf()` |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `ugMax` | `number` | get/set via `setUgMax()` |
| `ugPouchSize` | `number` | get/set via `setUgPouchSize()` |

### `SAV5`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `adventureInfo` | `AdventureInfo5` | get-only |
| `allBlocks` | `readonly BlockInfo[]` | get-only |
| `battleBox` | `BattleBox5` | get-only |
| `battleSubway` | `BattleSubway5` | get-only |
| `battleSubwayPlay` | `BattleSubwayPlay5` | get-only |
| `battleTest` | `Uint8Array` | get-only |
| `battleVideoDownload1` | `Uint8Array` | get-only |
| `battleVideoDownload2` | `Uint8Array` | get-only |
| `battleVideoDownload3` | `Uint8Array` | get-only |
| `battleVideoNative` | `Uint8Array` | get-only |
| `boxLayout` | `BoxLayout5` | get-only |
| `cgearSkinData` | `Uint8Array` | get-only |
| `chatter` | `Chatter5` | get-only |
| `country` | `number` | get/set via `setCountry()` |
| `daycare` | `Daycare5` | get-only |
| `daycareSlotCount` | `number` | get-only |
| `encount` | `Encount5` | get-only |
| `entralink` | `Entralink5` | get-only |
| `entreeForest` | `EntreeForest` | get-only |
| `eventWork` | `EventWork5` | get-only |
| `forest` | `WhiteBlack5` | get-only |
| `gts` | `GTS5` | get-only |
| `getBattleVideo(index: number)` | `Uint8Array` |  |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getDaycareexp(slot: number)` | `number` |  |
| `getDaycareSlot(slot: number)` | `Uint8Array` |  |
| `getMail(mailIndex: number)` | `MailDetail` |  |
| `getMailData(offset: number)` | `Uint8Array` |  |
| `globalLink` | `GlobalLink5` | get-only |
| `hallOfFame1` | `Uint8Array` | get-only |
| `hallOfFame2` | `Uint8Array` | get-only |
| `isAvailablePokedexSkin` | `boolean` | get/set via `setIsAvailablePokedexSkin()` |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `items` | `MyItem` | get-only |
| `link1Data` | `Uint8Array` | get-only |
| `link2Data` | `Uint8Array` | get-only |
| `misc` | `Misc5` | get-only |
| `musical` | `Musical5` | get-only |
| `musicalDownloadData` | `Uint8Array` | get-only |
| `musicalDownloadSize` | `number` | get-only — Variable sized NARC download depending on the game (B/W vs B2/W2). |
| `mystery` | `MysteryBlock5` | get-only |
| `playerData` | `PlayerData5` | get-only |
| `playerPosition` | `PlayerPosition5` | get-only |
| `pokedexSkinData` | `Uint8Array` | get-only |
| `records` | `Record5` | get-only |
| `region` | `number` | get/set via `setRegion()` |
| `setBattleTest(data: Uint8Array, count: number)` | `void` |  |
| `setBattleVideo(index: number, data: Uint8Array, count: number)` | `void` |  |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setCgearSkin(data: Uint8Array, count: number)` | `void` |  |
| `setDaycareexp(slot: number, value: number)` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |
| `setHallOfFame(data: Uint8Array, count: number)` | `void` |  |
| `setLink1Data(data: Uint8Array)` | `void` |  |
| `setLink2Data(data: Uint8Array)` | `void` |  |
| `setMusical(data: Uint8Array, count: number)` | `void` |  |
| `setPokeDexSkin(data: Uint8Array, count: number)` | `void` |  |
| `skinInfo` | `SkinInfo5` | get-only |
| `unityTower` | `UnityTower5` | get-only |
| `zukan` | `Zukan5` | get-only |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `getMailOffset(index: number)` | `number` |  |
| `hallOfFameSize` | `number` | get/set via `setHallOfFameSize()` |

### `SAV5B2W2`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `blocks` | `SaveBlockAccessor5B2W2` | get-only |
| `festa` | `FestaBlock5` | get-only |
| `getKeyData()` | `Uint8Array` |  |
| `getpwt(index: number)` | `Uint8Array` |  |
| `getPokestarMovie(index: number)` | `Uint8Array` |  |
| `joinAvenue` | `JoinAvenue5` | get-only |
| `keys` | `KeySystem5` | get-only |
| `medals` | `MedalList5` | get-only |
| `pwt` | `PWTBlock5` | get-only |
| `rivalName` | `string` | get/set via `setRivalName()` |
| `rivalNameTrash` | `Uint8Array` | get/set via `setRivalNameTrash()` |
| `setKeyData(data: Uint8Array, count: number)` | `void` |  |
| `setpwt(index: number, data: Uint8Array, count: number)` | `void` |  |
| `setPokestarMovie(index: number, data: Uint8Array, count: number)` | `void` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `extUnk7e800` | `number` | get/set via `setExtUnk7e800()` |
| `extUnkcrgf` | `number` | get/set via `setExtUnkcrgf()` |
| `keyDataOffset` | `number` | get/set via `setKeyDataOffset()` |
| `pwtCount` | `number` | get/set via `setPwtCount()` |
| `pwtInterval` | `number` | get/set via `setPwtInterval()` |
| `pwtLength` | `number` | get/set via `setPwtLength()` |
| `pwtOffset` | `number` | get/set via `setPwtOffset()` |
| `pokestarCount` | `number` | get/set via `setPokestarCount()` |
| `pokestarInterval` | `number` | get/set via `setPokestarInterval()` |
| `pokestarLength` | `number` | get/set via `setPokestarLength()` |
| `pokestarOffset` | `number` | get/set via `setPokestarOffset()` |

### `SAV5BW`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `blocks` | `SaveBlockAccessor5BW` | get-only |

### `SAV6`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `bp` | `number` | get/set via `setBp()` |
| `badges` | `number` | get/set via `setBadges()` |
| `consoleRegion` | `number` | get/set via `setConsoleRegion()` |
| `country` | `number` | get/set via `setCountry()` |
| `eventWork` | `EventWork6` | get-only |
| `gameSyncid` | `string` | get/set via `setGameSyncid()` |
| `gameSyncidSize` | `number` | get-only |
| `gameTime` | `GameTime6` | get-only |
| `getjpegData()` | `Uint8Array` |  |
| `getRecord(recordID: number)` | `number` |  |
| `getRecordMax(recordID: number)` | `number` |  |
| `getRecordOffset(recordID: number)` | `number` |  |
| `hof` | `number` | get/set via `setHof()` |
| `itemInfo` | `ItemInfo6` | get-only |
| `items` | `MyItem` | get-only |
| `jpegTitle` | `string` | get-only |
| `overworld` | `FieldMoveModelSave6` | get-only |
| `pss` | `number` | get/set via `setPss()` |
| `played` | `PlayTime6` | get-only |
| `recordCount` | `number` | get-only |
| `records` | `RecordBlock6` | get-only |
| `region` | `number` | get/set via `setRegion()` |
| `setRecord(recordID: number, value: number)` | `void` |  |
| `situation` | `Situation6` | get-only |
| `status` | `MyStatus6` | get-only |
| `vivillon` | `number` | get/set via `setVivillon()` |

### `SAV6AO`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleBox` | `BattleBox6` | get-only |
| `battleBoxLocked` | `boolean` | get/set via `setBattleBoxLocked()` |
| `berryField` | `BerryField6AO` | get-only |
| `blocks` | `SaveBlockAccessor6AO` | get-only |
| `boxLayout` | `BoxLayout6` | get-only |
| `config` | `ConfigSave6` | get-only |
| `contest` | `Contest6` | get-only |
| `daycareCount` | `number` | get-only |
| `encount` | `Encount6` | get-only |
| `fused` | `UnionPokemon6` | get-only |
| `gts` | `GTS6` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `hallOfFame` | `HallOfFame6` | get-only |
| `link` | `LinkBlock6` | get-only |
| `maison` | `MaisonBlock` | get-only |
| `misc` | `Misc6AO` | get-only |
| `multiplayerSpriteid` | `number` | get/set via `setMultiplayerSpriteid()` |
| `mysteryGift` | `MysteryBlock6` | get-only |
| `opower` | `OPower6` | get-only |
| `puff` | `Puff6` | get-only |
| `sube` | `SubEventLog6AO` | get-only |
| `secretBase` | `SecretBase6Block` | get-only |
| `setBoxName(box: number, name: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, wallpaper: number)` | `void` |  |
| `superTrain` | `SuperTrainBlock` | get-only |
| `zukan` | `Zukan6AO` | get-only |

### `SAV6AODemo`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `blocks` | `SaveBlockAccessor6AODemo` | get-only |

### `SAV6XY`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleBox` | `BattleBox6` | get-only |
| `battleBoxLocked` | `boolean` | get/set via `setBattleBoxLocked()` |
| `berryField` | `BerryField6XY` | get-only |
| `blocks` | `SaveBlockAccessor6XY` | get-only |
| `boxLayout` | `BoxLayout6` | get-only |
| `config` | `ConfigSave6` | get-only |
| `daycareSlotCount` | `number` | get-only |
| `encount` | `Encount6` | get-only |
| `fashion` | `Fashion6XY` | get-only |
| `fused` | `UnionPokemon6` | get-only |
| `gts` | `GTS6` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getDaycareexp(index: number)` | `number` |  |
| `getDaycareSlot(index: number)` | `Uint8Array` |  |
| `hallOfFame` | `HallOfFame6` | get-only |
| `isDaycareOccupied(index: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `link` | `LinkBlock6` | get-only |
| `maison` | `MaisonBlock` | get-only |
| `misc` | `Misc6XY` | get-only |
| `multiplayerSpriteid` | `number` | get/set via `setMultiplayerSpriteid()` |
| `mysteryGift` | `MysteryBlock6` | get-only |
| `opower` | `OPower6` | get-only |
| `puff` | `Puff6` | get-only |
| `sube` | `SubEventLog6XY` | get-only |
| `setBoxName(box: number, name: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, wallpaper: number)` | `void` |  |
| `setDaycareexp(index: number, exp: number)` | `void` |  |
| `setDaycareOccupied(index: number, occupied: boolean)` | `void` |  |
| `superTrain` | `SuperTrainBlock` | get-only |
| `unlockAllFriendSafariSlots()` | `void` |  |
| `zukan` | `Zukan6XY` | get-only |

### `SAV7`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleTree` | `BattleTree7` | get-only |
| `boxLayout` | `BoxLayout7` | get-only |
| `config` | `ConfigSave7` | get-only |
| `consoleRegion` | `number` | get/set via `setConsoleRegion()` |
| `country` | `number` | get/set via `setCountry()` |
| `daycare` | `Daycare7` | get-only |
| `daycareSlotCount` | `number` | get-only |
| `eventWork` | `EventWork7` | get-only |
| `fashion` | `FashionBlock7` | get-only |
| `festa` | `JoinFesta7` | get-only |
| `fieldMenu` | `FieldMenu7` | get-only |
| `fused` | `UnionPokemon7` | get-only |
| `gts` | `GTS7` | get-only |
| `gameSyncid` | `string` | get/set via `setGameSyncid()` |
| `gameSyncidSize` | `number` | get-only |
| `gameTime` | `GameTime7` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getDaycareSlot(index: number)` | `Uint8Array` |  |
| `getFusedSlotOffset(slot: number)` | `number` |  |
| `getRecord(recordID: number)` | `number` |  |
| `getRecordMax(recordID: number)` | `number` |  |
| `getRecordOffset(recordID: number)` | `number` |  |
| `isDaycareOccupied(index: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `items` | `MyItem` | get-only |
| `misc` | `Misc7` | get-only |
| `multiplayerSpriteid` | `number` | get/set via `setMultiplayerSpriteid()` |
| `myStatus` | `MyStatus7` | get-only |
| `mysteryGift` | `MysteryBlock7` | get-only |
| `overworld` | `FieldMoveModelSave7` | get-only |
| `played` | `PlayTime6` | get-only |
| `pokeFinder` | `PokeFinder7` | get-only |
| `recordCount` | `number` | get-only |
| `records` | `RecordBlock6` | get-only |
| `region` | `number` | get/set via `setRegion()` |
| `resortSave` | `ResortSave7` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setDaycareOccupied(index: number, occupied: boolean)` | `void` |  |
| `setRecord(recordID: number, value: number)` | `void` |  |
| `situation` | `Situation7` | get-only |
| `updateQrConstants()` | `void` |  |
| `zukan` | `Zukan7` | get-only |

### `SAV7SM`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `blocks` | `SaveBlockAccessor7SM` | get-only |

### `SAV7USUM`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleAgency` | `BattleAgency7` | get-only |
| `blocks` | `SaveBlockAccessor7USUM` | get-only |

### `SAV7b`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `blocks` | `SaveBlockAccessor7b` | get-only |
| `captured` | `CaptureRecords` | get-only |
| `config` | `ConfigSave7b` | get-only |
| `coordinates` | `Coordinates7b` | get-only |
| `daycare` | `Daycare7b` | get-only |
| `eventWork` | `EventWork7b` | get-only |
| `fixStoragePreWrite()` | `boolean` |  |
| `gameSyncid` | `string` | get/set via `setGameSyncid()` |
| `gameSyncidSize` | `number` | get-only |
| `giftRecords` | `WB7Records` | get-only |
| `items` | `MyItem7b` | get-only |
| `misc` | `Misc7b` | get-only |
| `park` | `GoParkStorage` | get-only |
| `played` | `PlayTime7b` | get-only |
| `playerGeoLocation` | `PlayerGeoLocation7b` | get-only |
| `status` | `MyStatus7b` | get-only |
| `storage` | `PokeListHeader` | get-only |
| `zukan` | `Zukan7b` | get-only |

### `SAV8BS`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `battleTower` | `BattleTowerWork8b` | get-only |
| `battleTrainer` | `BattleTrainerStatus8b` | get-only |
| `berryTrees` | `BerryTreeGrowSave8b` | get-only |
| `boxLayout` | `BoxLayout8b` | get-only |
| `config` | `ConfigSave8b` | get-only |
| `contest` | `Contest8b` | get-only |
| `contestPhotoLanguage` | `ContestPhotoLanguage8b` | get-only |
| `daycare` | `Daycare8b` | get-only |
| `daycareSlotCount` | `number` | get-only |
| `encounter` | `EncounterSave8b` | get-only |
| `eventWorkCount` | `number` | get-only |
| `fieldGimmick` | `FieldGimmickSave8b` | get-only |
| `fieldObjects` | `FieldObjectSave8b` | get-only |
| `flagWork` | `FlagWork8b` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getDaycareSlot(index: number)` | `Uint8Array` |  |
| `getRecord(recordID: number)` | `number` |  |
| `getRecordMax(recordID: number)` | `number` |  |
| `getRecordOffset(recordID: number)` | `number` |  |
| `getWork(index: number)` | `number` |  |
| `hasFirstSaveFileExpansion` | `boolean` | get-only |
| `hasSecondSaveFileExpansion` | `boolean` | get-only |
| `isDaycareOccupied(slot: number)` | `boolean` |  |
| `isEggAvailable` | `boolean` | get/set via `setIsEggAvailable()` |
| `items` | `MyItem8b` | get-only |
| `menuSelection` | `MenuSelect8b` | get-only |
| `myStatus` | `MyStatus8b` | get-only |
| `mysteryRecords` | `MysteryBlock8b` | get-only |
| `partyInfo` | `Party8b` | get-only |
| `played` | `PlayTime8b` | get-only |
| `player` | `PlayerData8b` | get-only |
| `poffins` | `PoffinSaveData8b` | get-only |
| `poketch` | `Poketch8b` | get-only |
| `random` | `RandomGroup8b` | get-only |
| `recordAdd` | `RecordAddData8b` | get-only |
| `recordCount` | `number` | get-only |
| `records` | `Record8b` | get-only |
| `rivalName` | `string` | get/set via `setRivalName()` |
| `rivalNameTrash` | `Uint8Array` | get-only |
| `saveRevision` | `number` | get/set via `setSaveRevision()` |
| `saveRevisionString` | `string` | get-only |
| `sealDeco` | `SealBallDecoData8b` | get-only |
| `sealList` | `SealList8b` | get-only |
| `selectBoundItems` | `SaveItemShortcut8b` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setDaycareOccupied(slot: number, occupied: boolean)` | `void` |  |
| `setRecord(recordID: number, value: number)` | `void` |  |
| `setWork(index: number, value: number)` | `void` |  |
| `system` | `SystemData8b` | get-only |
| `timeScale` | `number` | get/set via `setTimeScale()` |
| `ugCount` | `UgCountRecord8b` | get-only |
| `ugSaveData` | `UgSaveData8b` | get-only |
| `underground` | `UndergroundItemList8b` | get-only |
| `unionRoomPenaltyTime` | `number` | get/set via `setUnionRoomPenaltyTime()` |
| `unionSave` | `UnionSaveData8b` | get-only |
| `zoneid` | `number` | get/set via `setZoneid()` |
| `zukan` | `Zukan8b` | get-only |
| `zukanExtra` | `ZukanSpinda8b` | get-only |

### `SAV8LA`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `accessor` | `SCBlockAccessor` | get-only |
| `adventureStart` | `Epoch1970Value` | get-only |
| `allBlocks` | `readonly SCBlock[]` | get-only |
| `areaSpawners` | `AreaSpawnerSet8a` | get-only |
| `blocks` | `SaveBlockAccessor8LA` | get-only |
| `boxInfo` | `Box8` | get-only |
| `boxLayout` | `BoxLayout8a` | get-only |
| `coordinates` | `Coordinates8a` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getValue(key: number)` | `T` |  |
| `items` | `MyItem8a` | get-only |
| `lastSaved` | `Epoch1900DateTimeValue` | get-only |
| `myStatus` | `MyStatus8a` | get-only |
| `partyInfo` | `Party8a` | get-only |
| `played` | `PlayTime8b` | get-only |
| `pokedexSave` | `PokedexSave8a` | get-only |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setValue(key: number, value: T)` | `void` |  |

### `SAV8SWSH`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `accessor` | `SCBlockAccessor` | get-only |
| `allBlocks` | `readonly SCBlock[]` | get-only |
| `badges` | `number` | get/set via `setBadges()` |
| `blocks` | `SaveBlockAccessor8SWSH` | get-only |
| `boxInfo` | `Box8` | get-only |
| `boxLayout` | `BoxLayout8` | get-only |
| `coordinates` | `Coordinates8` | get-only |
| `daycare` | `Daycare8` | get-only |
| `fashion` | `FashionUnlock8` | get-only |
| `fused` | `Fused8` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getRecord(recordID: number)` | `number` |  |
| `getRecordMax(recordID: number)` | `number` |  |
| `getRecordOffset(recordID: number)` | `number` |  |
| `getValue(key: number)` | `T` |  |
| `items` | `MyItem8` | get-only |
| `misc` | `Misc8` | get-only |
| `myStatus` | `MyStatus8` | get-only |
| `partyInfo` | `Party8` | get-only |
| `played` | `PlayTime7b` | get-only |
| `raidArmor` | `RaidSpawnList8` | get-only |
| `raidCrown` | `RaidSpawnList8` | get-only |
| `raidGalar` | `RaidSpawnList8` | get-only |
| `recordCount` | `number` | get-only |
| `records` | `Record8` | get-only |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setRecord(recordID: number, value: number)` | `void` |  |
| `setValue(key: number, value: T)` | `void` |  |
| `teamIndexes` | `TeamIndexes8` | get-only |
| `titleScreen` | `TitleScreen8` | get-only |
| `trainerCard` | `TrainerCard8` | get-only |
| `unlockAllDiglett()` | `void` |  |
| `zukan` | `Zukan8` | get-only |

### `SAV9SV`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `accessor` | `SCBlockAccessor` | get-only |
| `activateSnacksworthLegendaries()` | `void` |  |
| `allBlocks` | `readonly SCBlock[]` | get-only |
| `blocks` | `SaveBlockAccessor9SV` | get-only |
| `blueberryClubRoom` | `BlueberryClubRoom9` | get-only |
| `blueberryPoints` | `number` | get/set via `setBlueberryPoints()` |
| `blueberryQuestRecord` | `BlueberryQuestRecord9` | get-only |
| `boxInfo` | `Box9` | get-only |
| `boxLayout` | `BoxLayout9` | get-only |
| `boxLegendWallpaperFlag` | `number` | get/set via `setBoxLegendWallpaperFlag()` |
| `collectAllStakes()` | `void` |  |
| `config` | `ConfigSave9` | get-only |
| `coordinates` | `Uint8Array` | get-only |
| `enrollmentDate` | `Epoch1900DateValue` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getValue(key: number)` | `T` |  |
| `items` | `MyItem9` | get-only |
| `lastDateCycle` | `Epoch1970Value` | get-only |
| `lastSaved` | `Epoch1900DateTimeValue` | get-only |
| `leaguePoints` | `number` | get/set via `setLeaguePoints()` |
| `myStatus` | `MyStatus9` | get-only |
| `partyInfo` | `Party9` | get-only |
| `played` | `PlayTime9` | get-only |
| `playerAppearance` | `PlayerAppearance9` | get-only |
| `playerFashion` | `PlayerFashion9` | get-only |
| `playerRotation` | `Uint8Array` | get-only |
| `rw` | `number` | get/set via `setRw()` |
| `rx` | `number` | get/set via `setRx()` |
| `ry` | `number` | get/set via `setRy()` |
| `rz` | `number` | get/set via `setRz()` |
| `raidBlueberry` | `RaidSpawnList9` | get-only |
| `raidKitakami` | `RaidSpawnList9` | get-only |
| `raidPaldea` | `RaidSpawnList9` | get-only |
| `raidSevenStar` | `RaidSevenStar9` | get-only |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setCoordinates(x: number, y: number, z: number)` | `void` |  |
| `setPlayerRotation(rx: number, ry: number, rz: number, rw: number)` | `void` |  |
| `setValue(key: number, value: T)` | `void` |  |
| `teamIndexes` | `TeamIndexes8` | get-only |
| `throwStyle` | `"OriginalStyle" \| "LeftHandedStyle" \| "ElegantStyle" \| "ReverentStyle" \| "NinjaStyle" \| "DaintyStyle" \| "TwirlingStyle" \| "SmugStyle" \| "GalarianStarStyle"` | get/set via `setThrowStyle()` |
| `unlockAllCoaches()` | `void` |  |
| `unlockAlltmRecipes()` | `void` |  |
| `unlockAllThrowStyles()` | `void` |  |
| `x` | `number` | get/set via `setX()` |
| `y` | `number` | get/set via `setY()` |
| `z` | `number` | get/set via `setZ()` |
| `zukan` | `Zukan9` | get-only |

### `SAV9ZA`

*kind: class · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `accessor` | `SCBlockAccessor` | get-only |
| `allBlocks` | `readonly SCBlock[]` | get-only |
| `blocks` | `SaveBlockAccessor9ZA` | get-only |
| `boxInfo` | `Box8` | get-only |
| `boxLayout` | `BoxLayout9a` | get-only |
| `config` | `ConfigSave9a` | get-only |
| `coordinates` | `Coordinates9a` | get-only |
| `donuts` | `DonutPocket9a` | get-only |
| `getBoxName(box: number)` | `string` |  |
| `getBoxWallpaper(box: number)` | `number` |  |
| `getValue(key: number)` | `T` |  |
| `infiniteRoyale` | `InfiniteRoyale9a` | get-only |
| `items` | `MyItem9a` | get-only |
| `lastSaved` | `Epoch1900DateTimeValue` | get-only |
| `myStatus` | `MyStatus9a` | get-only |
| `partyInfo` | `Party9a` | get-only |
| `played` | `PlayTime9a` | get-only |
| `playerAppearance` | `PlayerAppearance9a` | get-only |
| `playerFashion` | `PlayerFashion9a` | get-only |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |
| `setBoxName(box: number, value: readonly string[])` | `void` |  |
| `setBoxWallpaper(box: number, value: number)` | `void` |  |
| `setValue(key: number, value: T)` | `void` |  |
| `startTime` | `Epoch1900DateTimeValue` | get-only |
| `teamIndexes` | `TeamIndexes8` | get-only |
| `ticketPointsRoyale` | `number` | get/set via `setTicketPointsRoyale()` |
| `ticketPointsRoyaleInfinite` | `number` | get/set via `setTicketPointsRoyaleInfinite()` |
| `zukan` | `Zukan9a` | get-only |

### `SAV_BEEF`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `allBlocks` | `readonly BlockInfo[]` | get-only |
| `timeStampCurrent` | `bigint` | get/set via `setTimeStampCurrent()` — Timestamp that the save file was last saved at (Secure Value) |
| `timeStampPrevious` | `bigint` | get/set via `setTimeStampPrevious()` — Timestamp that the save file was saved at prior to the  (Secure Value) |

### `SAV_STADIUM`

*kind: abstract · extends `SaveFile`.*

| Member | Type | Description |
| --- | --- | --- |
| `getRegisteredTeams()` | `readonly SlotGroup[]` |  |
| `getTeam(team: number)` | `SlotGroup` |  |
| `japanese` | `boolean` | readonly (computed) |
| `korean` | `boolean` | readonly (computed) |
| `saveRevision` | `number` | get-only |
| `saveRevisionString` | `string` | get-only |

### `SK2`

*kind: class · context: Gen2 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `caughtData` | `number` | get/set via `setCaughtData()` |
| `convertTopk2()` | `PK2` |  |
| `heldMailid` | `number` | get/set via `setHeldMailid()` |
| `isPossible(japanese: boolean)` | `boolean` |  |
| `isRental` | `boolean` | get/set via `setIsRental()` |
| `metTimeOfDay` | `number` | get/set via `setMetTimeOfDay()` |
| `pokerusState` | `number` | get/set via `setPokerusState()` |
| `swapLanguage()` | `void` |  |

### `SaveFile`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `adaptToSaveFile(pk: PKM, isParty: boolean, option: "UseDefault" | "Enable" | "Disable")` | `void` |  |
| `blankpkm` | `PKM` | get-only |
| `boxCount` | `number` | get-only |
| `boxData` | `readonly PKM[]` | get/set via `setBoxData()` |
| `boxFlags` | `Uint8Array` | get/set via `setBoxFlags()` |
| `boxSlotCount` | `number` | get-only |
| `boxesUnlocked` | `number` | get/set via `setBoxesUnlocked()` |
| `buffer` | `Uint8Array` | get/set via `setBuffer()` |
| `caughtCount` | `number` | readonly (computed) — Count of unique Species Caught (Owned) |
| `checksumInfo` | `string` | get-only |
| `checksumsValid` | `boolean` | get-only |
| `clearBoxes(BoxStart: number, BoxEnd: number, deleteCriteria: (arg0: PKM) => boolean)` | `number` |  |
| `clone()` | `SaveFile` |  |
| `compressStorage(storedCount: number, slotPointers: readonly number[])` | `boolean` |  |
| `context` | `"None" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen8" \| "Gen9" \| "SplitInvalid" \| "Gen7b" \| "Gen8a" \| "Gen8b" \| "Gen9a" \| "MaxInvalid"` | get-only |
| `copyChangesFrom(sav: SaveFile)` | `void` |  |
| `currentBox` | `number` | get/set via `setCurrentBox()` |
| `data` | `Uint8Array` | get-only |
| `deletePartySlot(slot: number)` | `void` |  |
| `displaysid` | `number` | get/set via `setDisplaysid()` |
| `displaytid` | `number` | get/set via `setDisplaytid()` |
| `extension` | `string` | get-only |
| `gender` | `number` | get/set via `setGender()` |
| `generation` | `number` | readonly (computed) |
| `getBoxBinary(box: number)` | `Uint8Array` |  |
| `getBoxData(box: number)` | `readonly PKM[]` |  |
| `getBoxData(data: readonly PKM[], box: number, index: number)` | `void` |  |
| `getBoxOffset(box: number)` | `number` |  |
| `getBoxSlotAtIndex(box: number, slot: number)` | `PKM` |  |
| `getBoxSlotAtIndex(index: number)` | `PKM` |  |
| `getBoxSlotFlags(box: number, slot: number)` | `"None" \| "Party" \| "Party1" \| "Party2" \| "Party3" \| "Party4" \| "Party5" \| "Party6" \| "BattleTeam" \| "BattleTeam1" \| "BattleTeam2" \| "BattleTeam3" \| "BattleTeam4" \| "BattleTeam5" \| "BattleTeam6" \| "Starter" \| "Locked"` |  |
| `getBoxSlotFlags(index: number)` | `"None" \| "Party" \| "Party1" \| "Party2" \| "Party3" \| "Party4" \| "Party5" \| "Party6" \| "BattleTeam" \| "BattleTeam1" \| "BattleTeam2" \| "BattleTeam3" \| "BattleTeam4" \| "BattleTeam5" \| "BattleTeam6" \| "Starter" \| "Locked"` |  |
| `getBoxSlotFromIndex(index: number, box: number, slot: number)` | `void` |  |
| `getBoxSlotOffset(index: number)` | `number` |  |
| `getBoxSlotOffset(box: number, slot: number)` | `number` |  |
| `getCaught(species: number)` | `boolean` |  |
| `getDecryptedpkm(data: Uint8Array)` | `PKM` |  |
| `getFlag(data: Uint8Array, offset: number, bitIndex: number)` | `boolean` |  |
| `getFlag(offset: number, bitIndex: number)` | `boolean` |  |
| `getpcBinary()` | `Uint8Array` |  |
| `getPartyOffset(slot: number)` | `number` |  |
| `getPartySlot(data: Uint8Array)` | `PKM` |  |
| `getPartySlotAtIndex(index: number)` | `PKM` |  |
| `getSeen(species: number)` | `boolean` |  |
| `getStoredSlot(data: Uint8Array)` | `PKM` |  |
| `getString(data: Uint8Array)` | `string` |  |
| `hasBox` | `boolean` | get-only |
| `hasParty` | `boolean` | get-only |
| `hasPokeDex` | `boolean` | get-only |
| `heldItems` | `readonly number[]` | get-only |
| `id32` | `number` | get/set via `setId32()` |
| `inventory` | `PlayerBag` | get-only |
| `isAnySlotLockedInBox(BoxStart: number, BoxEnd: number)` | `boolean` |  |
| `isBoxSlotLocked(box: number, slot: number)` | `boolean` |  |
| `isBoxSlotLocked(index: number)` | `boolean` |  |
| `isBoxSlotOverwriteProtected(index: number)` | `boolean` |  |
| `isBoxSlotOverwriteProtected(box: number, slot: number)` | `boolean` |  |
| `ispkmPresent(data: Uint8Array)` | `boolean` |  |
| `isPartyAllEggs(except: number)` | `boolean` |  |
| `isStorageFull` | `boolean` | get-only |
| `isVersionValid()` | `boolean` |  |
| `language` | `number` | get/set via `setLanguage()` |
| `loadString(data: Uint8Array, text: readonly string[])` | `number` |  |
| `maxAbilityid` | `number` | get-only |
| `maxBallid` | `number` | get-only |
| `maxCoins` | `number` | get-only |
| `maxev` | `number` | get-only |
| `maxGameid` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get-only |
| `maxiv` | `number` | get-only |
| `maxItemid` | `number` | get-only |
| `maxMoney` | `number` | get-only |
| `maxMoveid` | `number` | get-only |
| `maxSpeciesid` | `number` | get-only |
| `maxStringLengthNickname` | `number` | get-only |
| `maxStringLengthTrainer` | `number` | get-only |
| `metadata` | `SaveFileMetadata` | get/set via `setMetadata()` |
| `minGameid` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get-only |
| `miscSaveInfo()` | `string` |  |
| `modifyBoxes(action: (arg0: PKM) => void, BoxStart: number, BoxEnd: number)` | `number` |  |
| `money` | `number` | get/set via `setMoney()` |
| `moveBox(box: number, insertBeforeBox: number)` | `boolean` |  |
| `nextOpenBoxSlot(lastKnownOccupied: number)` | `number` |  |
| `ot` | `string` | get/set via `setOt()` |
| `pkmExtensions` | `readonly string[]` | get-only |
| `pkmType` | `Type` | get-only |
| `partyCount` | `number` | get/set via `setPartyCount()` |
| `partyData` | `readonly PKM[]` | get/set via `setPartyData()` |
| `percentCaught` | `number` | readonly (computed) |
| `percentSeen` | `number` | readonly (computed) |
| `personal` | `IPersonalTable` | get-only |
| `playTimeString` | `string` | readonly (computed) |
| `playedHours` | `number` | get/set via `setPlayedHours()` |
| `playedMinutes` | `number` | get/set via `setPlayedMinutes()` |
| `playedSeconds` | `number` | get/set via `setPlayedSeconds()` |
| `sid16` | `number` | get/set via `setSid16()` |
| `sizeBoxslot` | `number` | get-only |
| `sizeParty` | `number` | get-only |
| `sizeStored` | `number` | get-only |
| `secondsToFame` | `number` | get/set via `setSecondsToFame()` |
| `secondsToStart` | `number` | get/set via `setSecondsToStart()` |
| `seenCount` | `number` | readonly (computed) |
| `setBoxBinary(data: Uint8Array, box: number)` | `boolean` |  |
| `setBoxData(value: readonly PKM[], box: number, index: number)` | `number` |  |
| `setBoxSlot(pk: PKM, data: Uint8Array, settings: EntityImportSettings)` | `void` |  |
| `setBoxSlotAtIndex(pk: PKM, index: number, settings: EntityImportSettings)` | `void` |  |
| `setBoxSlotAtIndex(pk: PKM, box: number, slot: number, settings: EntityImportSettings)` | `void` |  |
| `setCaught(species: number, caught: boolean)` | `void` |  |
| `setData(input: Uint8Array, offset: number)` | `void` |  |
| `setData(dest: Uint8Array, input: Uint8Array)` | `void` |  |
| `setFlag(data: Uint8Array, offset: number, bitIndex: number, value: boolean)` | `void` |  |
| `setFlag(offset: number, bitIndex: number, value: boolean)` | `void` |  |
| `setpcBinary(data: Uint8Array)` | `boolean` |  |
| `setPartySlot(pk: PKM, data: Uint8Array, settings: EntityImportSettings)` | `void` |  |
| `setPartySlotAtIndex(pk: PKM, index: number, settings: EntityImportSettings)` | `void` |  |
| `setSeen(species: number, seen: boolean)` | `void` |  |
| `setSlotFormatParty(pk: PKM, data: Uint8Array, settings: EntityImportSettings)` | `void` |  |
| `setSlotFormatStored(pk: PKM, data: Uint8Array, settings: EntityImportSettings)` | `void` |  |
| `setString(destBuffer: Uint8Array, value: readonly string[], maxLength: number, option: "None" | "ClearZero" | "Clear50" | "Clear7F" | "ClearFF" | "ClearZeroSafeTerminate")` | `number` |  |
| `slotCount` | `number` | readonly (computed) |
| `sortBoxes(BoxStart: number, BoxEnd: number, sortMethod: (arg0: readonly PKM[], arg1: number) => readonly PKM[], reverse: boolean)` | `number` |  |
| `state` | `SaveFileState` | get-only |
| `swapBox(box1: number, box2: number)` | `boolean` |  |
| `tid16` | `number` | get/set via `setTid16()` |
| `traineridDisplayFormat` | `"None" \| "SixteenBitSingle" \| "SixteenBit" \| "SixDigit"` | get-only |
| `trainersid7` | `number` | get/set via `setTrainersid7()` |
| `trainertid7` | `number` | get/set via `setTrainertid7()` |
| `version` | `"Any" \| "S" \| "R" \| "E" \| "FR" \| "LG" \| "HG" \| "SS" \| "D" \| "P" \| "Pt" \| "CXD" \| "BATREV" \| "W" \| "B" \| "W2" \| "B2" \| "X" \| "Y" \| "AS" \| "OR" \| "SN" \| "MN" \| "US" \| "UM" \| "GO" \| "RD" \| "GN" \| "BU" \| "YW" \| "GD" \| "SI" \| "C" \| "GP" \| "GE" \| "SW" \| "SH" \| "PLA" \| "BD" \| "SP" \| "SL" \| "VL" \| "ZA" \| "CP" \| "RB" \| "RBY" \| "GS" \| "GSC" \| "RS" \| "RSE" \| "FRLG" \| "RSBOX" \| "COLO" \| "XD" \| "DP" \| "DPPt" \| "HGSS" \| "BW" \| "B2W2" \| "XY" \| "ORASDEMO" \| "ORAS" \| "SM" \| "USUM" \| "GG" \| "SWSH" \| "BDSP" \| "SV" \| "Gen1" \| "Gen2" \| "Gen3" \| "Gen4" \| "Gen5" \| "Gen6" \| "Gen7" \| "Gen7b" \| "Gen8" \| "Gen9" \| "StadiumJ" \| "Stadium" \| "Stadium2" \| "EFL" \| "Invalid"` | get/set via `setVersion()` |
| `write(setting: "None" | "ExcludeFooter" | "ExcludeHeader" | "ExcludeFinalize")` | `Uint8Array` |  |

Static members:

| Member | Type | Description |
| --- | --- | --- |
| `setUpdateSettings` | `EntityImportSettings` | get-only |

### `XK3`

*kind: class · context: Gen3 · extends `PKM`.*

| Member | Type | Description |
| --- | --- | --- |
| `blockTrades` | `boolean` | get/set via `setBlockTrades()` |
| `capturedFlag` | `boolean` | get/set via `setCapturedFlag()` |
| `convertTopk3()` | `PK3` |  |
| `currentRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setCurrentRegion()` |
| `encounterInfo` | `number` | get/set via `setEncounterInfo()` |
| `isShadow` | `boolean` | get/set via `setIsShadow()` |
| `nicknameDisplay` | `string` | get/set via `setNicknameDisplay()` |
| `nicknameDisplayTrash` | `Uint8Array` | get-only |
| `obedient` | `boolean` | get/set via `setObedient()` |
| `originalRegion` | `"NoRegion" \| "NTSC_J" \| "NTSC_U" \| "PAL"` | get/set via `setOriginalRegion()` |
| `purification` | `number` | get/set via `setPurification()` |
| `resetNicknameDisplay()` | `void` |  |
| `shadowid` | `number` | get/set via `setShadowid()` |
| `unusedFlag0` | `boolean` | get/set via `setUnusedFlag0()` |
| `unusedFlag1` | `boolean` | get/set via `setUnusedFlag1()` |
| `unusedFlag3` | `boolean` | get/set via `setUnusedFlag3()` |

### `ZukanBase<T>`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `caughtAll(shinyToo: boolean)` | `void` |  |
| `caughtCount` | `number` | readonly (computed) — Count of unique Species Caught (Owned) |
| `caughtNone()` | `void` |  |
| `clearDexEntryAll(species: number)` | `void` |  |
| `completeDex(shinyToo: boolean)` | `void` |  |
| `getCaught(species: number)` | `boolean` |  |
| `getSeen(species: number)` | `boolean` |  |
| `percentCaught` | `number` | readonly (computed) |
| `percentSeen` | `number` | readonly (computed) |
| `seenAll(shinyToo: boolean)` | `void` |  |
| `seenCount` | `number` | readonly (computed) — Count of unique Species Seen |
| `seenNone()` | `void` |  |
| `setAllSeen(value: boolean, shinyToo: boolean)` | `void` |  |
| `setDex(pk: PKM)` | `void` |  |
| `setDexEntryAll(species: number, shinyToo: boolean)` | `void` |  |

### `Zukan<T>`

*kind: abstract.*

| Member | Type | Description |
| --- | --- | --- |
| `caughtAll(shinyToo: boolean)` | `void` |  |
| `caughtNone()` | `void` |  |
| `clearDexEntryAll(species: number)` | `void` |  |
| `completeDex(shinyToo: boolean)` | `void` |  |
| `getCaught(species: number)` | `boolean` |  |
| `getDisplayed(bit: number, bitRegion: number)` | `boolean` |  |
| `getLanguageFlag(bit: number, lang: number)` | `boolean` |  |
| `getSeen(species: number)` | `boolean` |  |
| `getSeen(species: number, bitRegion: number)` | `boolean` |  |
| `seenAll(shinyToo: boolean)` | `void` |  |
| `seenNone()` | `void` |  |
| `setAllCaught(value: boolean, shinyToo: boolean)` | `void` |  |
| `setAllSeen(value: boolean, shinyToo: boolean)` | `void` |  |
| `setCaught(species: number, value: boolean)` | `void` |  |
| `setCaughtSingle(species: number, value: boolean)` | `void` |  |
| `setDex(pk: PKM)` | `void` |  |
| `setDexEntriesAll(value: boolean, max: number, shinyToo: boolean)` | `void` |  |
| `setDexEntryAll(species: number, shinyToo: boolean)` | `void` |  |
| `setDisplayed(bit: number, bitRegion: number, value: boolean)` | `void` |  |
| `setLanguageFlag(bit: number, lang: number, value: boolean)` | `void` |  |
| `setSeen(species: number, value: boolean)` | `void` |  |
| `setSeen(species: number, bitRegion: number, value: boolean)` | `void` |  |
| `setSeenSingle(species: number, seen: boolean, shinyToo: boolean)` | `void` |  |

### Unresolved references

Named types outside the scanned class set resolve as `unknown` until
the reflector's scope widens:

`AdventureInfo5`, `AreaSpawnerSet8a`, `BattleAgency7`, `BattleBox5`, `BattleBox6`, `BattlePassAccessor`, `BattleSubway5`, `BattleSubwayPlay5`, `BattleTowerWork8b`, `BattleTrainerStatus8b`, `BattleTree7`, `BattleVideo3`, `BattleVideo4`, `BerryField6AO`, `BerryField6XY`, `BerryTreeGrowSave8b`, `BlockInfo`, `BlueberryClubRoom9`, `BlueberryQuestRecord9`, `Box8`, `Box9`, `BoxLayout5`, `BoxLayout6`, `BoxLayout7`, `BoxLayout8`, `BoxLayout8a`, `BoxLayout8b`, `BoxLayout9`, `BoxLayout9a`, `CaptureRecords`, `Chatter4`, `Chatter5`, `ConfigSave6`, `ConfigSave7`, `ConfigSave7b`, `ConfigSave8b`, `ConfigSave9`, `ConfigSave9a`, `Contest6`, `Contest8b`, `ContestPhotoLanguage8b`, `Coordinates7b`, `Coordinates8`, `Coordinates8a`, `Coordinates9a`, `Daycare5`, `Daycare7`, `Daycare7b`, `Daycare8`, `Daycare8b`, `DonutPocket9a`, `Encount5`, `Encount5BW`, `Encount6`, `EncounterSave8b`, `EntityImportSettings`, `Entralink5`, `Entralink5BW`, `EntreeForest`, `Epoch1900DateTimeValue`, `Epoch1900DateValue`, `Epoch1970Value`, `EventWork5`, `EventWork5B2W2`, `EventWork5BW`, `EventWork6`, `EventWork7`, `EventWork7SM`, `EventWork7USUM`, `EventWork7b`, `Fashion6XY`, `FashionBlock7`, `FashionUnlock8`, `FestaBlock5`, `FieldGimmickSave8b`, `FieldMenu7`, `FieldMoveModelSave6`, `FieldMoveModelSave7`, `FieldObjectSave8b`, `FlagWork8b`, `Fused8`, `GTS5`, `GTS6`, `GTS7`, `GameDataCore`, `GameDataPA8`, `GameDataPA9`, `GameDataPB7`, `GameDataPB8`, `GameDataPC9`, `GameDataPK8`, `GameDataPK9`, `GameTime6`, `GameTime7`, `GearUnlock`, `GlobalLink5`, `GoParkStorage`, `Group4`, `Hall4`, `HallOfFame6`, `HallOfFameReader1`, `HoneyTreeValue`, `IBaseStat`, `IGameDataSide`, `IItemStorage`, `IPermitRecord`, `IPersonalMisc`, `IPersonalTable`, `ISaveBlock3Large`, `ISaveBlock3Small`, `ITrainerInfo`, `IndividualValueSet`, `InfiniteRoyale9a`, `InventoryItem`, `InventoryItem7`, `InventoryItem7b`, `InventoryItem8`, `InventoryItem8a`, `InventoryItem8b`, `InventoryItem9`, `InventoryItem9a`, `ItemInfo6`, `ItemStorage1`, `ItemStorage2`, `ItemStorage3Colo`, `ItemStorage3E`, `ItemStorage3RS`, `ItemStorage3XD`, `ItemStorage4DP`, `ItemStorage4HGSS`, `ItemStorage4Pt`, `ItemStorage5B2W2`, `ItemStorage5BW`, `ItemStorage6AO`, `ItemStorage6XY`, `ItemStorage7GG`, `ItemStorage7SM`, `ItemStorage7USUM`, `ItemStorage8BDSP`, `ItemStorage8LA`, `ItemStorage8SWSH`, `ItemStorage9SV`, `ItemStorage9ZA`, `JoinAvenue5`, `JoinFesta7`, `KeySystem5`, `LinkBlock6`, `Mail4`, `MailDetail`, `MaisonBlock`, `MedalList5`, `MenuSelect8b`, `Misc5`, `Misc5BW`, `Misc6AO`, `Misc6XY`, `Misc7`, `Misc7b`, `Misc8`, `Musical5`, `MyItem`, `MyItem5B2W2`, `MyItem5BW`, `MyItem6AO`, `MyItem6XY`, `MyItem7SM`, `MyItem7USUM`, `MyItem7b`, `MyItem8`, `MyItem8a`, `MyItem8b`, `MyItem9`, `MyItem9a`, `MyStatus6`, `MyStatus6XY`, `MyStatus7`, `MyStatus7b`, `MyStatus8`, `MyStatus8a`, `MyStatus8b`, `MyStatus9`, `MyStatus9a`, `MysteryBlock4`, `MysteryBlock4DP`, `MysteryBlock4HGSS`, `MysteryBlock4Pt`, `MysteryBlock5`, `MysteryBlock6`, `MysteryBlock7`, `MysteryBlock8b`, `OPower6`, `PCD`, `PWTBlock5`, `Party8`, `Party8a`, `Party8b`, `Party9`, `Party9a`, `PersonalInfo`, `PersonalInfo1`, `PersonalInfo2`, `PersonalInfo3`, `PersonalInfo4`, `PersonalInfo5B2W2`, `PersonalInfo6AO`, `PersonalInfo7`, `PersonalInfo7GG`, `PersonalInfo8BDSP`, `PersonalInfo8LA`, `PersonalInfo8SWSH`, `PersonalInfo9SV`, `PersonalInfo9ZA`, `PersonalTable1`, `PersonalTable2`, `PersonalTable3`, `PersonalTable4`, `PersonalTable5B2W2`, `PersonalTable5BW`, `PersonalTable6AO`, `PersonalTable6XY`, `PersonalTable7`, `PersonalTable7GG`, `PersonalTable8BDSP`, `PersonalTable8LA`, `PersonalTable8SWSH`, `PersonalTable9SV`, `PersonalTable9ZA`, `PlayTime6`, `PlayTime7b`, `PlayTime8b`, `PlayTime9`, `PlayTime9a`, `PlayerAppearance9`, `PlayerAppearance9a`, `PlayerData5`, `PlayerData5B2W2`, `PlayerData8b`, `PlayerFashion9`, `PlayerFashion9a`, `PlayerGeoLocation7b`, `PlayerPosition5`, `PoffinSaveData8b`, `PokeFinder7`, `PokeListHeader`, `Pokeathlon4`, `PokedexSave8a`, `Poketch8b`, `Puff6`, `RaidSevenStar9`, `RaidSpawnList8`, `RaidSpawnList9`, `RanchMii`, `RanchToy`, `RanchTrainerMii`, `RandomGroup8b`, `Record4`, `Record5`, `Record8`, `Record8b`, `RecordAddData8b`, `RecordBlock6`, `RecordBlock6AO`, `RecordBlock6XY`, `RecordBlock7SM`, `RecordBlock7USUM`, `ResortSave7`, `Roamer4`, `SAV3GCMemoryCard`, `SCBlock`, `SCBlockAccessor`, `SaveBlock3LargeE`, `SaveBlock3LargeFRLG`, `SaveBlock3LargeRS`, `SaveBlock3SmallE`, `SaveBlock3SmallFRLG`, `SaveBlock3SmallRS`, `SaveBlockAccessor5B2W2`, `SaveBlockAccessor5BW`, `SaveBlockAccessor6AO`, `SaveBlockAccessor6AODemo`, `SaveBlockAccessor6XY`, `SaveBlockAccessor7SM`, `SaveBlockAccessor7USUM`, `SaveBlockAccessor7b`, `SaveBlockAccessor8LA`, `SaveBlockAccessor8SWSH`, `SaveBlockAccessor9SV`, `SaveBlockAccessor9ZA`, `SaveFileMetadata`, `SaveFileState`, `SaveItemShortcut8b`, `SealBallDecoData8b`, `SealList8b`, `SecretBase6Block`, `Situation6`, `Situation7`, `SkinInfo5`, `SlotGroup`, `SubEventLog6AO`, `SubEventLog6XY`, `SuperTrainBlock`, `SystemData8b`, `T`, `TCompare`, `TItem`, `TeamIndexes8`, `TitleScreen8`, `TrainerCard8`, `Type`, `UgCountRecord8b`, `UgSaveData8b`, `UndergroundItemList8b`, `UnionPokemon6`, `UnionPokemon7`, `UnionSaveData8b`, `UnityTower5`, `WB7Records`, `WhiteBlack5`, `WhiteBlack5B2W2`, `WhiteBlack5BW`, `Zukan4`, `Zukan5`, `Zukan6AO`, `Zukan6XY`, `Zukan7`, `Zukan7b`, `Zukan8`, `Zukan8b`, `Zukan9`, `Zukan9a`, `ZukanSpinda8b`

### Narrowing guards

- `isBK4(entity: PKM)`
- `isCK3(entity: PKM)`
- `isPA8(entity: PKM)`
- `isPA9(entity: PKM)`
- `isPB7(entity: PKM)`
- `isPB8(entity: PKM)`
- `isPK1(entity: PKM)`
- `isPK2(entity: PKM)`
- `isPK3(entity: PKM)`
- `isPK4(entity: PKM)`
- `isPK5(entity: PKM)`
- `isPK6(entity: PKM)`
- `isPK7(entity: PKM)`
- `isPK8(entity: PKM)`
- `isPK9(entity: PKM)`
- `isRK4(entity: PKM)`
- `isSK2(entity: PKM)`
- `isXK3(entity: PKM)`
