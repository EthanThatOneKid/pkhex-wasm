# PKHeX.Core Projectable Surface Inventory

Exhaustive inventory of the API surface under `external/PKHeX.Everywhere/external/PKHeX/PKHeX.Core` that a Roslyn→ts-morph projection must cover. All entries read directly from source (submodule @ `external/PKHeX.Everywhere`). Items marked `(unverified)` were inferred and not individually re-checked.

## 0. Counts summary

| Area | Projectable members | Notes |
|---|---|---|
| Base `PKM` class | ~185 public members (≈120 props, ≈65 methods) across 13 concept groups | ~40 are `virtual` no-op "future" defaults |
| Shared intermediate bases | GBPKM (~35) / GBPKML (~10) / G3PKM (~45) / G4PKM (~95) / G6PKM (~15) / G8PKM (~150) | G8PKM is the heaviest single base |
| Concrete format classes (18) | distinct members beyond inherited surface: PK1 12, PK2 12, SK2 6, PK3 30 (+G3), CK3 15, XK3 12, PK4 20 (+G4 95), BK4 2, RK4 10, PK5 25, PK6 55, PK7 25, PB7 60, PK8 4, PB8 4, PA8 70, PK9 25, PA9 ~20 | ribbon flags dominate: G4 ~90 bools each of PK4/BK4/RK4; G8 ~96 ribbon/mark bools each of PK8/PB8/PA8/PK9/PA9 |
| `SaveFile` base | ~110 public members: identity/money/time ~18, box mgmt ~30, party ~10, dex hooks 8, import/export ~25, limits 9 | most are virtual; abstract per save class: Version, ChecksumsValid/Info, Generation, Context, GetPartyOffset, GetBoxOffset, SetChecksums, PKMType, GetPKM, DecryptPKM, BlankPKM, SIZE_STORED/PARTY, MaxEV, HeldItems, Personal, string limits |
| Bag subsystem | `PlayerBag` (7 methods) + 22 concrete bags + `InventoryPouch` base + 11 pouch impls + 16-value `InventoryType` | one bag+impl set per game group |
| Dex (`Zukan*`) | `ZukanBase` 14 members; `Zukan` adds ~25; concrete Zukan4/5/6/7/7b/8 | Zukan8 is SCBlock-based (not raw-offset) |
| Records | static `Records` (200 records: 100×int32 + 100×int16), `RecordBlock`, per-gen Record3/4/5/RecordBlock6, `ITrainerStatRecord` | |
| Daycare | interfaces only: IDaycareMulti, IDaycareStorage, IDaycareEggState, IDaycareExperience, IDaycareRandomState | implemented per-save |

## 1. PKM hierarchy

Inheritance map:

```
PKM
├─ GBPKM ─ GBPKML ─ PK1, PK2          (Gen1/2 mainline; strings in separate buffers)
│         └ SK2                        (Stadium 2; inline strings)
├─ G3PKM ─ PK3, CK3, XK3               (GBA + Colosseum/XD)
├─ G4PKM ─ PK4, BK4, RK4               (NDS + Battle Revolution big-endian + Ranch)
├─ PK5                                 (Gen5, direct)
├─ G6PKM ─ PK6, PK7, PB7               (3DS + LGPE)
├─ G8PKM ─ PK8, PB8                    (SWSH + BDSP)
├─ PA8                                 (PLA, direct from PKM)
├─ PK9                                 (SV, direct from PKM)
└─ PA9                                 (Z-A, direct from PKM)
```

### Format table

| Class | EntityContext | Gen | Distinct public members beyond inherited surface (kind · type · access) |
|---|---|---|---|
| **PK1** | Gen1 | 1 | `SpeciesInternal` prop ushort g+s (raw); `Stat_LevelBox` prop int g+s; `Type1`/`Type2`/`CatchRate` prop byte g+s; `EV_SPC`/`DV16` (via GBPKML chain); `Stat_SPC` prop int g+s; `Gen2Item` get-only int (method-derived); `GetSingleListChecksum()` method ushort; `ConvertToPK2()`/`ConvertToPK7()` methods; `SetTypes<T>()` method. Implements IPersonalType. Party stats = stored stats (SIZE_PARTY == SIZE_STORED). |
| **PK2** | Gen2 | 2 | ICaughtData2: `CaughtData` prop ushort g+s; `MetTimeOfDay` prop int g+s; `SpeciesInternal` alias prop ushort g+s; `PokerusState` byte g+s; `EV_SPC`, `DV16`; Crystal-only caught data packs MetLevel/OTGender/MetLocation into CaughtData. `ConvertToPK1()`, `ConvertToPK7()`, `ConvertToSK2()`; `GetSingleListChecksum()`. |
| **SK2** | Gen2 (Stadium) | 2 | Big-endian like PK2 but `EXP` stored as full u32; `IsEncodingJapanese` backing flag drives `Japanese`; 12-char string buffers inline; IsEgg bit at 0x1E. No ConvertTo methods beyond GBPKM surface. |
| **PK3** | Gen3 | 3 | ISanityChecksum: `Sanity`/`Checksum` ushort g+s; `FlagIsBadEgg`/`FlagHasSpecies`/`FlagIsEgg` bool g+s; `MarkingValue` byte g+s (bit-swapped 1↔2 vs Gen4); `IV32` uint g+s; `AbilityBit` bool g+s; ribbons: 5×`RibbonCountG3{Cool,Beauty,Cute,Smart,Tough}` byte g+s + 13 bool ribbons (ChampionG3, Winning, Victory, Artist, Effort, ChampionBattle/Regional/National, Country, National, Earth, World, Unused1-4); `RibbonCount` get-only int; `HeldMailID` sbyte g+s; `PokerusState` byte g+s; `PrepareNickname()`; `GetNicknamePrefillRegion()` Span<byte>; `ConvertToPK4()/XK3()/CK3()`. |
| **CK3** | Gen3 (Colosseum) | 3 | IShadowCapture: `ShadowID` ushort, `Purification` int, both g+s big-endian; ISeparateIVs: separate IV words (not packed IV32); IGCRegion: `CurrentRegion`/`OriginalRegion` GCRegion g+s; `NicknameDisplayTrash` Span<byte> + `NicknameDisplay` string g+s (shadow catchphrase display); `PartySlot` byte g+s; `EXP_Shadow` uint g+s; `Status_Condition` not stored. |
| **XK3** | Gen3 (XD) | 3 | Same trio of interfaces as CK3 (ShadowID/Purification, separate IVs, CurrentRegion/OriginalRegion); `NicknameDisplay`/`NicknameDisplayTrash`; `ResetNicknameDisplay()` method; purification progress fields. |
| **PK4** | Gen4 | 4 | `Sanity`/`Checksum`; `IV32`; `PokerusState`; `ShinyLeaf` byte g+s (HGSS); ~90 bool ribbons incl. unused RIB3_4..7/RIBA_4..7/RIBB_0..7; `RibbonCount` get-only; `MarkingValue` byte + 6 named markings; `GroundTile` GroundTileType g+s; `BallDPPt`/`BallHGSS` byte g+s; `WalkingMood` sbyte g+s; `EggLocationDP`/`EggLocationExtended`/`MetLocationDP`/`MetLocationExtended` ushort g+s (merged virtual EggLocation/MetLocation); `BallCapsuleIndex` byte g+s; `HeldMail` Span<byte> (0x38); `Seals` Span<byte> (0x18); `ConvertToBK4()/RK4()/PK5()`. |
| **BK4** | Gen4 (Battle Revolution) | 4 | Same shape as PK4 but **big-endian**: PID/Sanity/Checksum/species/locations all BE reads; IV bit order reversed (HP at bit 27); IsNicknamed bit 0 / IsEgg bit 1 (swapped vs LE); MetLevel shifted <<1 with OTGender in bit 0; checksum Add16**BigEndian**; Characteristic uses `GetCharacteristicInvertFields`; party battle stats **not stored** (get/set to auto fields). |
| **RK4** | Gen4 (My Pokémon Ranch) | 4 | `OwnershipType` RanchOwnershipType g+s; `OwnershipStatus` RanchOwnershipStatus (BE u16) g+s; `HandlingTrainerID32`/`HandlingTrainerTID`/`HandlingTrainerSID` g+s; `HandlingTrainerTrash` Span<byte> override + `HandlingTrainerName` string g+s; SIZE_4RSTORED; battle stats computed on the fly via GetStats; `ConvertToPK4()`. |
| **PK5** | Gen5 | 5 | `Sanity`/`Checksum`; `IV32`; `MarkingValue` byte + 6 markings (non-virtual here); `HiddenAbility` bool g+s; `NSparkle` bool g+s; `PokeStarFame` byte g+s + `IsPokeStar` bool; `JunkByte` byte g+s; `JunkData` ulong g+s; `GroundTile`; `BelongsTo(ITrainerInfo)`/`UpdateHandler(ITrainerInfo)` methods; static `GetTransferPID(uint,uint,out bool)`; AbilityNumber derives from HiddenAbility‖PIDAbility; RefreshAbility sets HiddenAbility. |
| **PK6** | Gen6 | 6 | Memories OT+HT: `{Original,Handling}TrainerMemory{Intensity,,Feeling}` byte ×5, `MemoryVariable` ushort ×2; affection `OriginalTrainerAffection`/`HandlingTrainerAffection` byte; geolocation `Geo1..Geo5_{Country,Region}` byte ×10; super training: `SuperTrainBitFlags` uint + 28 bool flags ST1-4, `DistTrainBitFlags` ushort + `DistSuperTrain1-6`/`Dist7`/`Dist8` bools, `SecretSuperTrainingUnlocked`/`SuperTrainSupremelyTrained` bools; `TrainingBag`/`TrainingBagHits`/`TrainingBagEffect` bytes; `Fullness`/`Enjoyment` bytes; `FormArgument` uint g+s + `FormArgumentMaximum` byte; ribbons ×48 bool incl. memory-ribbon counts `RibbonCountMemoryContest/Battle` byte, `HasContestMemoryRibbon`/`HasBattleMemoryRibbon`, ChampionKalos/G6Hoenn, ContestStar/Master* ×5; `Country`/`Region`/`ConsoleRegion` bytes; `OppositeFriendship` byte g+s; `IsUntradedEvent6` get-only bool; `FixMemories()`; TradeOT/TradeHT overrides; `FixRelearn()`; MarkingCount 6. Interfaces: IGeoTrack, ISuperTrainRegimen, IFormArgument, ITrainerMemories, IAffection, IGroundTile, IAppliedMarkings4, IFullnessEnjoyment, IRibbonSetCommon6/Memory6. |
| **PK7** | Gen7 | 7 | Everything PK6 has plus: hyper training `HyperTrainFlags` byte + `HT_HP/ATK/DEF/SPA/SPD/SPE` bool ×6 (IHyperTrain); dual-bit color markings `MarkingColor MarkingCircle/Triangle/Square/Heart/Star/Diamond` + `GetMarking/SetMarking(index)` (ushort MarkingValue, 2 bits each); `ResortEventStatus` ResortEventState enum g+s; `DirtType`/`DirtLocation` bytes; extra ribbons RibbonChampionAlola, RibbonBattleRoyale, RibbonBattleTreeGreat/Master, RIB6_2..7 unused; nickname setter special-cases Chinese species names (private-use codepoints). Interfaces add IHyperTrain, IPokerusStatus, IAppliedMarkings7. |
| **PB7** | Gen7b (LGPE) — read-only tier for mutators | 7b | Awakening values `AV_HP/ATK/DEF/SPE/SPA/SPD` byte ×6 (IAwakened); scale system `HeightScalar`/`WeightScalar` byte + `HeightAbsolute`/`WeightAbsolute` float (IScaledSizeValue); CP system: `Stat_CP` ushort g+s, `CalcCP`/`BaseCP`/`AwakeCP`/`CPScalar` get-only ints, `ResetCP()`/`ResetCalculatedValues()`; height/weight calc family: `HeightRatio`/`WeightRatio`/`CalcHeightAbsolute`/`CalcWeightAbsolute` get-only floats, `ResetHeight()/ResetWeight()`, statics `GetHeightAbsolute/GetWeightAbsolute/GetHeightScalar/GetWeightScalar/GetRandomIndex`; friendship-scaled stat boost in `LoadStats` override; `Spirit`/`Mood` bytes + `InitialSpiritMood` const + `ResetSpiritMood()`; `ReceivedDate` DateOnly? + `ReceivedTime` TimeOnly? + Received{Year,Month,Day,Hour,Minute,Second} bytes; `Rank` int g+s; `Stat_Mega` bool + `Stat_MegaForm` int; `HT_*` ×6; FormArgument family; `IsFavorite` bool; `IsStarter` get-only bool. |
| **PK8** | Gen8 (SWSH) — edit tier | 8 | From G8PKM (see below) plus: `DynamaxType` ushort g+s (Dynamax move id @0x156); `IsSideTransfer` get-only bool; SV/BDSP/LA version flags overridden to detect HOME side-transfers via MetLocation. |
| **PB8** | Gen8b (BDSP) — edit tier | 8b | From G8PKM plus: `IsDprIllegal` bool g+s (@0x52); ctor seeds EggLocation/MetLocation/AffixedRibbon defaults; `HasOriginalMetLocation` excludes PLA transfer location. |
| **PA8** | Gen8a (PLA) — read-only tier | 8a | Alpha/Noble: `IsAlpha` bool, `IsNoble` bool (bits 5/6 of AbilityNumber byte) — IAlpha/INoble; `AlphaMove` ushort g+s; Ganbaru effort levels `GV_HP/ATK/DEF/SPE/SPA/SPD` byte ×6 (IGanbaru); `UnkA0`/`UnkF3` ints; scale: HeightScalar/WeightScalar/Scale bytes + HeightAbsolute/WeightAbsolute floats + ratio/calc/reset family (±20% formulas, statics shared w/ PB7 shape); mastery records: `MoveRecordFlags` Span(14) + Get/Set/Clear/Any helpers, `PurchasedRecord` Span(8) + Get/Set/Any/`GetPurchasedCount()`, `MasteredRecord` Span(8) + helpers, `SetMasteryFlags()`/`SetMasteryFlagMove(ushort)`; custom `LoadStats` (ganbaru formula: `(sqrt(base)*mult + level)/2.5` etc.); `Tracker` ulong; `AffixedRibbon` sbyte; Sociability; DynamaxLevel; CanGigantamax; IsFavorite; BattleVersion; HandlingTrainerLanguage/ID; ribbon index API (GetRibbon/SetRibbon/GetRibbonByte). |
| **PK9** | Gen9 (SV) — edit tier | 9 | Species remap: `SpeciesInternal` ushort g+s + national↔internal conversion in Species (SpeciesConverter9); Tera: `TeraTypeOriginal`/`TeraTypeOverride` MoveType g+s + computed `TeraType` get-only (ITeraType); obedience: `ObedienceLevel` byte g+s (IObedienceLevel); scales HeightScalar/WeightScalar/Scale bytes (IScaledSize/IScaledSize3); TM records split: `RecordFlagsBase` Span(25 bytes→200 flags @0x12F) + `RecordFlagsDLC` Span(13 bytes→104 flags @0x4B) unified through Get/SetMoveRecordFlag; `Tracker` ulong; `AffixedRibbon` sbyte; FormArgument family; `HandlingTrainerLanguage`; `IsUnhatchedEgg` get-only; `BelongsToSkipVersion(tr)` (adds Language match, drops Version); egg-handler logic w/ Jacq gift exception (location 60005). |
| **PA9** | Gen9a (Z-A) — edit tier | 9a | Like PK9 layout (SpeciesInternal remap, ObedienceLevel, scales, Tracker, AffixedRibbon, records) plus IAlpha (alpha flag) and IPlusRecord (plus-record flag span replacing TM-record DLC split — single record region). Full member list matches PK9 modulo TeraType fields absent. `(unverified: exact PlusRecord span offsets not line-read)` |

### Ribbon interface implementation matrix

| Interface | Implemented by |
|---|---|
| IRibbonSetEvent3 / Event4 | PK4, BK4, RK4, PK5, PK6, PK7, PB7, G8PKM(PK8/PB8/PA8), PK9, PA9 |
| IRibbonSetCommon3 / Common4 | G3PKM(PK3/CK3/XK3), G4PKM, PK5, PK6, PK7, PB7, G8PKM, PK9, PA9 |
| IRibbonSetUnique3 / Unique4 | G3PKM, G4PKM |
| IRibbonSetOnly3 | G3PKM |
| IRibbonSetCommon6 / Memory6 | PK6, PK7, PB7, G8PKM, PK9, PA8, PA9 |
| IRibbonSetCommon7 | PK7, PB7, G8PKM, PK9, PA8, PA9 |
| IRibbonSetCommon8 | G8PKM, PA8 |
| IRibbonSetCommon9 / Mark8 / Mark9 | G8PKM(PK8/PB8/PA8), PK9, PA9 |
| IRibbonSetMarks | G8PKM, PK9, PA8, PA9 |
| IRibbonSetAffixed / IRibbonIndex | G8PKM, PA8, PK9, PA9 |
| IRibbonSetRibbons | G3PKM, G4PKM, PK5, PK6, PK7, PB7, G8PKM, PA8, PK9, PA9 |

## 2. Base PKM member groups (~185 members)

Groups from `PKM.cs` (1225 lines). "gen avail" notes where base marks virtual/defaulted.

| Group | Members (kind · C# type · access) | Gen availability |
|---|---|---|
| **Structure/binary** | `SIZE_PARTY`/`SIZE_STORED` prop int get-only abs; `Extension` string get-only; `PersonalInfo` get-only abs; `ExtraBytes` ReadOnlySpan<ushort> virt; `Data` Span<byte> get-only; `Valid` bool g+s abs; Write family: `WriteDecryptedDataStored/Party`, `WriteEncryptedDataStored/Party` (Span dest) virt; protected abs `EncryptStored/EncryptParty`; `Clone()` abs; `EqualsStored(PKM)` virt | all gens |
| **String codec** | `GetString`, `LoadString`, `SetString`, `GetStringTerminatorIndex`, `GetStringLength`, `GetBytesPerChar` — abs, Span-based; `MaxStringLengthTrainer/Nickname`, `TrashCharCountTrainer/Nickname` int get-only abs | all gens (encoding differs: Gen1/2 1-byte tables, Gen3-5 UTF-16 variant tables, Gen6+ Unicode) |
| **Trash bytes** | `NicknameTrash`, `OriginalTrainerTrash` Span<byte> abs; `HandlingTrainerTrash` Span<byte> virt (empty default → real from PK6/G8/PA8/RK4) | HT trash: Gen6+ |
| **Identity/species-form** | `Species` ushort, `Form` byte, `Nickname` string, `IsNicknamed` bool, `Gender` byte, `Nature` Nature, `StatAlignment` Nature (virt, aliases Nature until G8 where it's a separate byte), `Context` EntityContext abs, `Format` byte get-only, `Version` GameVersion abs, `Generation` byte get-only derived, game-flag bools: E/FRLG/Pt/HGSS/BW/B2W2/XY/AO/SM/USUM/GO/VC1/VC2/LGPE/SWSH (get-only), BDSP/LA/SV (virtual — overridden by PK8 MetLocation detection), ZA/GO_LGPE/GO_HOME/VC/GG/Gen1..Gen9/GenU get-only | StatAlignment separate storage: Gen8+/PA8/PK9 |
| **OT attribution** | `TID16`/`SID16` ushort, `ID32` uint, `OriginalTrainerName` string, `OriginalTrainerGender` byte, `OriginalTrainerFriendship` byte — abs g+s; aliases `TrainerTID7`/`TrainerSID7`/`DisplayTID`/`DisplaySID` uint g+s (extension-method backed); `CurrentHandler` byte abs g+s (no-op before Gen6) | TID7 display semantics: Gen7+ |
| **Handler (future)** | `HandlingTrainerName` string, `HandlingTrainerGender`/`HandlingTrainerFriendship` byte, `MetYear/MetMonth/MetDay`, `EggYear/EggMonth/EggDay`, `AbilityNumber` int — all `virtual` returning default/no-op on base | HT fields: Gen6+; dates: Gen4+; AbilityNumber: Gen6+ (derived Gen3-5) |
| **Dates** | `MetDate` DateOnly? g+s (composed from MetY/M/D, null when invalid), `EggMetDate` DateOnly? g+s | Gen4+ (PB7 adds ReceivedDate/Time) |
| **Item/ball/ability** | `HeldItem` int abs, `Ball` byte abs, `Ability` int abs, `SpriteItem` int virt (item-conversion alias on GB/older), `RefreshAbility(int n)` virt method, `CanHoldItem(ReadOnlySpan<ushort>)` virt, `PIDAbility` int get-only (Gen≤5 only) | Ball meaningful Gen3+ |
| **Met/egg locations** | `MetLocation`/`EggLocation` ushort abs, `MetLevel` byte abs, `WasEgg` virt bool, `WasTradedEgg`/`IsTradedEgg` get-only, `IsUntraded` virt bool (real impl G6PKM/G8/PA8/PK9/PA9), `HasOriginalMetLocation` virt bool, protected `SetLinkTradeEgg(day,month,year,loc)` | |
| **Friendship/lang/fateful** | `CurrentFriendship` byte abs (aliases OT friendship pre-Gen6; handler-dispatched after), `Language` int abs, `FatefulEncounter` bool abs, `Japanese`/`Korean` virt bools | |
| **Moves** | `Move1..4` ushort, `Move1_PP..4_PP`, `Move1_PPUps..4_PPUps` int — abs; arrays/methods: `Moves` ushort[] g+s, `RelearnMove1..4` ushort virt (default 0 → real Gen6+), `RelearnMoves` ushort[] g+s, `AddMove(ushort,bool)`, `MoveCount`, `GetMoves/SetMoves(Span)`, `HasMove`, `GetMoveIndex`, `GetMove/SetMove(idx)`, `FixMoves()`, `ClearInvalidMoves()`, `HealPP()`, `HealPPIndex(int)`, `GetMovePP(ushort,int)` virt, `GetBasePP(ushort)`, relearn getters/setters by index | Relearn: Gen6+ |
| **Hidden Power** | `HPPower` virt int (formula switches <6 vs ≥6; GB variant), `HPType` virt int g+s (writes low IV bits) | ≤Gen6 mechanic |
| **IVs/EVs** | `IV_HP..IV_SPD`, `EV_HP..EV_SPD` int abs (Gen1/2 route through DV16/EV_SPC); `IVs` int[] g+s ([Obsolete] getter), `GetIVs(Span)`/`GetIVs()`→uint iv32/`GetIVs(uint)` setter, `SetIVs(Span/uint)`, `GetEVs/SetEVs(Span)`, `GetIV(i)`/`GetEV(i)`, `IVTotal`/`EVTotal`/`MaximumIV`/`FlawlessIVCount` get-only, `SetRandomIVs(...)` ×4 overloads, `SetRandomIVsGO(...)` ×2 | MaxIV 31 (Gen3+), 15 (Gen1/2) |
| **Stats/level** | `EXP` uint abs; `CurrentLevel` byte g+s (derived ← Experience.GetLevel/GetEXP — **setter writes EXP**, getter recomputes); `Stat_Level` byte, `Stat_HPMax`, `Stat_HPCurrent`, `Stat_ATK/DEF/SPE/SPA/SPD` int abs; `Stats` ushort[] g+s; `GetStats(IBaseStat)`, `LoadStats(IBaseStat,Span)` virt (overridden by GBPKM/PB7/PA8), `SetStats(ReadOnlySpan<ushort>)`; `PartyStatsPresent` bool get-only; `ResetPartyStats()`, `Heal()`, `ForcePartyData()`; `PotentialRating` int get-only | |
| **PID/shiny** | `PID` uint abs, `EncryptionConstant` uint abs (alias of PID pre-Gen6), `TSV`/`PSV` uint get-only abs (shift >>3 pre-Gen6, >>4 Gen6+), `ShinyXor` ushort get-only, `IsShiny` virt get-only (**TSV==PSV comparison — shiny state is derived, never stored**), `Characteristic` int get-only abs (-1 for Gen1-3), `SetShiny()`, `SetShinySID(Shiny)`, `SetPIDGender(byte)`, `SetPIDNature(Nature)`, `SetPIDUnown3(byte)` | |
| **Pokérus** | `PokerusStrain`/`PokerusDays` int abs (0-default Gen1), `IsPokerusInfected`/`IsPokerusCured` bool g+s | Gen2+ |
| **Limits** | `MaxMoveID`/`MaxSpeciesID` ushort, `MaxItemID`/`MaxAbilityID`/`MaxBallID` int, `MaxGameID`/`MinGameID` GameVersion, `MaxIV`/`MaxEV` int — get-only abs/virt | |
| **Misc** | `FileName`/`FileNameWithoutExtension` string get-only, `IsOriginValid` bool get-only, `IsGenderValid()` virt method, `TransferPropertiesWithReflection(PKM)` (reflection-based — projection should skip or hand-roll) | |

## 3. SaveFile subsystems

### 3.1 Trainer identity & money/playtime (`SaveFile.cs`)
All `virtual` on base unless noted abstract:
- Identity: `Gender` byte, `Language` int (base returns -1), `ID32` uint, `TID16`/`SID16` ushort, `OT` string (defaults `"PKHeX"` program name), display aliases `TrainerTID7/TrainerSID7/DisplayTID/DisplaySID`, `TrainerIDDisplayFormat`.
- Playtime: `PlayedHours/Minutes/Seconds` int g+s, `PlayTimeString` get-only, `SecondsToStart`/`SecondsToFame` uint.
- Currency: `Money` uint, `MaxMoney` (9,999,999), `MaxCoins` (9,999). Coins/BP live only on concrete saves (e.g., BP in SAV6/7 blocks) — not on the abstract base.

### 3.2 Bag/inventory
- Base hook: `virtual PlayerBag Inventory => new EmptyPlayerBag()` — every real save overrides.
- `PlayerBag`: `Pouches` IReadOnlyList<InventoryPouch>, `Info` IItemStorage, `GetPouch(type)`, `GetMaxCount`, `Clamp`, `IsQuantitySane`, `IsLegal`, abstract `CopyTo(SaveFile)`.
- `InventoryPouch` (abstract): `Type` InventoryType, `Items` InventoryItem[], `MaxCount`, `Count`, `IsCramped`, `GetPouch/SetPouch(Span<byte>)`, Sort*/RemoveAll/ModifyAllCount/GiveItem/Sanitize family.
- Pouch implementations by generation: `InventoryPouchGB` (Gen1/2), `3`/`3GC` (RS-FRLG-E / XD·Colo), `4` (DP/Pt/HGSS), base `InventoryPouch` direct (Gen5/6), `7` (SM/USUM), `7b`, `8`, `8a`, `8b`, `9`, `9a`.
- `InventoryType` enum (16): None, Items, KeyItems, TMHMs, Medicine, Berries, Balls, BattleItems, MailItems, PCItems, FreeSpace, ZCrystals, Candy, Treasure, Ingredients, MegaStones.
- Concrete bags (one per game group): PlayerBag1/2, 3RS/3FRLG/3E/3XD/3Colosseum, 4DP/4Pt/4HGSS, 5BW/5B2W2, 6XY/6AO, 7SM/7USUM/7b, 8, 8a, 8b, 9, 9a.
- Per-save `MyItem : SaveBlock` classes hold raw item storage (with capability markers IItemNewFlag/IItemFreeSpace/IItemFavorite).

### 3.3 Pokédex
- Base hooks (all empty defaults): `HasPokeDex`, `GetSeen/SetSeen`, `GetCaught/SetCaught`, derived `SeenCount`/`CaughtCount`/`PercentSeen`/`PercentCaught`.
- `ZukanBase<T>`: SeenCount/CaughtCount/Percent*, abstract GetSeen/GetCaught/SetDex(PKM), bulk: SeenNone/CaughtNone/SeenAll/CompleteDex/CaughtAll/SetAllSeen/SetDexEntryAll/ClearDexEntryAll.
- `Zukan<T>` (Gen7-style bitfield shape): seen flags ×4 regions (gender/shiny) + displayed flags + language flags; OFS_SEEN/OFS_CAUGHT abstract offsets; Spinda spot pattern handling (`SetSpindaDexData`).
- Concrete: Zukan4 (per-game variants), Zukan5, Zukan6, Zukan7, Zukan7b, Zukan8 (**SCBlock-based** — three dex blocks Galar/Rigel1/Rigel2 with DLC revision detection + DexLookup dictionary; different shape entirely).

### 3.4 Daycare
Interface-driven, implemented per save: `IDaycareMulti` (DaycareCount + indexer), `IDaycareStorage` (DaycareSlotCount, GetDaycareSlot→Memory<byte>, Is/SetDaycareOccupied), `IDaycareEggState`, `IDaycareExperience` (level-up while parked), `IDaycareRandomState` (seeded RNG state, Gen6+).

### 3.5 Records
Static `Records` helper: fixed layout 100 large (int32) + 100 small (int16) records, `GetOffset(recordID)`, `GetMax(id,maxes)` against typed max table [999999999 … 7]. Persisted via per-save `RecordBlock`/`Records` substructure (Record3, Record4, Record5, RecordBlock6, WB7Records/CaptureRecords for LGPE). Entity-side hooks: `ITechRecord` (TM flags) and `IPlusRecord`.

### 3.6 Box management (all on `SaveFile` base — fully projectable once)
- Geometry: `BoxCount` abs; `BoxSlotCount` (default 30); `SlotCount`; `GetBoxOffset(box)` abs; `GetBoxSlotOffset(box,slot)` / `GetBoxSlotOffset(index)`; `GetBoxSlotFromIndex(index,out box,out slot)`.
- Slot IO: `GetBoxSlotAtIndex(box,slot)` / `(index)`, `SetBoxSlotAtIndex(pk,box,slot[,settings])` / `(pk,index)`, `BoxData` IList<PKM> get+set, `GetBoxData(box)`, `SetBoxData(list,box,index)`.
- Manipulation: `MoveBox`, `SwapBox`, `SortBoxes(start,end,sortMethod?,reverse?)`, `ClearBoxes(...)`, `ModifyBoxes(action,...)`, `CompressStorage(out count, pointers)`, `NextOpenBoxSlot`, `IsStorageFull`.
- Protection: `GetBoxSlotFlags(index)/(box,slot)`, `IsBoxSlotLocked` ×2, `IsBoxSlotOverwriteProtected` ×2, `IsAnySlotLockedInBox`, protected `SlotPointers`.
- Binary export/import: `GetPCBinary()`, `SetPCBinary(span)`, `GetBoxBinary(box)`, `SetBoxBinary(span,box)`.
- State: `CurrentBox`, `BoxesUnlocked`, `BoxFlags`, `HasBox`.
- Wallpaper/box-name detail lives behind optional `IBoxDetailWallpaper`/`IBoxDetailName` interfaces checked at runtime (projection: model as nullable capabilities).
- Virtual-vs-real: everything above is concrete on the base operating over `BoxBuffer`; only `GetBoxOffset`/`BoxCount`/buffer geometry are per-save.

### 3.7 Party & slot import/export (base-level, mostly concrete)
- `PartyCount`, `PartyData` IList<PKM> g+s, `HasParty`, `GetPartyOffset(slot)` abs, `GetPartySlotAtIndex`, `SetPartySlotAtIndex(pk,index,settings)`, `DeletePartySlot`, `IsPartyAllEggs`.
- Import pipeline: `GetDecryptedPKM(Memory<byte>)` → `DecryptPKM` abs + `GetPKM` abs; `GetPartySlot(data)`/`GetStoredSlot(data)`; write path `SetSlotFormatStored/Party`, `SetBoxSlot`, guarded by static toggles `SetUpdateDex/SetUpdatePKM/SetUpdateRecords` and `EntityImportSettings`; `AdaptToSaveFile(pk,isParty)` triggers virtual `SetPKM/SetDex/SetRecord` (empty defaults).
- Serialization: `Write(BinaryExportSetting)`, `GetFinalData`, `SetChecksums` abs, `ChecksumsValid`/`ChecksumInfo` abs, `Clone()`, `State`/`Metadata` objects, `GetFlag/SetFlag(offset,bit)` pairs, `SetData(span,offset)`, `CopyChangesFrom`, string codec trio, limit properties (`Personal`, MaxStringLength*, MaxMoveID…MaxItemID, HeldItems).

## 4. Cross-cutting gotchas for projection

1. **Derived fields everywhere**: `CurrentLevel` ⇄ `EXP` round-trip through Experience tables; `IsShiny` is *always computed* (`TSV==PSV`) — never persisted; `Gender` on GB formats is derived from DVs; `Nature` pre-Gen6 is `PID%25`; `Characteristic` derives from (EC|PID, IV32); `RibbonCount`/`MarkCount` are PopCount aggregations. A naive property-copy projection would silently corrupt these — they need getter-only treatment or explicit dependency ordering.
2. **PID-coupled mutations**: `SetShiny/SetPIDGender/SetPIDNature/SetPIDUnown3` loop RNG until constraint satisfied and may rewrite `EncryptionConstant` (= PID pre-Gen6). JS side must accept nondeterminism or pass a seed.
3. **Checksummed regions**: Gen3+ entities carry Sanity/Checksum (Add16 over block region; BK4 big-endian Add16). Save files have `SetChecksums`. Any byte-level edit from JS without calling RefreshChecksum produces bad eggs / rejected saves. Projection must expose refresh/checksum-validity explicitly.
4. **String trash bytes**: Nickname/OT/HT are fixed-width buffers with format-specific encodings (Gen1/2 single-byte tables + Korean Hangul hack, Gen3-5 UTF-16 w/ per-language tables + Nidoran full/half-width fixups, Gen6+ Unicode w/ Chinese private-use codepoint handling in PK7). `SetString` returns chars written; terminator styles (0x50 vs 0x00 fill) are preserved on rewrite in GBPKML. Project as string get/set + raw trash byte array access, never raw-only.
5. **Span-based APIs**: `Data`, trash Spans, `HeldMail`, `Seals`, `RecordFlags`, `PurchasedRecord` cannot cross [JSExport] directly — map to `byte[]` copies or offset+length accessor pairs. `WriteDecryptedDataStored/Party`/encrypt variants take destination Spans → return `Uint8Array`.
6. **DateOnly/TimeOnly**: `MetDate`/`EggMetDate` (all Gen4+) and PB7 `ReceivedDate`/`ReceivedTime` use `System.DateOnly?`/`TimeOnly?` with null-on-invalid semantics; year bias +2000. Map to ISO strings or {y,m,d} triples in TS.
7. **Big-endian islands**: PK1/PK2/SK2/BK4/CK3/XK3 store scalars big-endian (and BK4 flips IV bit order + IsEgg/IsNicknamed bits). Projection must not share accessor code between LE/BE siblings.
8. **Virtual no-op "future" members**: ~40 base members (HandlingTrainer*, dates, RelearnMoves, AbilityNumber) silently no-op on old formats — mutating them there succeeds without effect. The facade's read-only tier (Gen1/2, LGPE, PLA) needs an explicit reject list rather than relying on these stubs.
9. **Reflection escape hatch**: `TransferPropertiesWithReflection` and `[DynamicallyAccessedMembers]` attribute on PKM exist because cross-format property copying is reflection-driven — this is exactly what the projection replaces; flag it as non-projectable.
10. **Species internal-ID remaps**: PK1/PK2 (order differs from national), PK3/CK3/XK3, PK9/PA9 (SpeciesConverter) — `Species` property hides a conversion layer; keep `SpeciesInternal` accessible for round-tripping.
11. **HOME tracker**: G8/PA8/PK9/PA9 carry a misaligned `ulong Tracker` used for dedupe — must survive byte-exact edits.

## 5. Uncertainties

- PA9 full field list was sampled (first 120 lines + grep); its Plus-record span offsets and any Z-A-exclusive fields beyond IAlpha/IPlusRecord are `(unverified)`.
- Exact per-save overrides of `Inventory` (which concrete classes return which PlayerBag) mapped by file naming convention, not per-file verification — `(unverified)`.
- Coin/BP property names live in per-generation save blocks (e.g., BP counters) and were not itemized per save class — out of scope for base-class inventory.
