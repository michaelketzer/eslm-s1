import { ReactElement, ReactNode } from "react";
import HeroAvatar from "./HeroAvatar";

const heroNames = {
    abaddon: "Abaddon",
    abyssal_underlord: "Underlord",
    alchemist: "Alchemist",
    ancient_apparition: "Ancient Apparition",
    antimage: "Anti-Mage",
    arc_warden: "Arc Warden",
    axe: "Axe",
    bane: "Bane",
    batrider: "Batrider",
    beastmaster: "Beastmaster",
    bloodseeker: "Bloodseeker",
    bounty_hunter: "Bounty Hunter",
    brewmaster: "Brewmaster",
    bristleback: "Bristleback",
    broodmother: "Broodmother",
    centaur: "Centaur Warrunner",
    chaos_knight: "Chaos Knight",
    chen: "Chen",
    clinkz: "Clinkz",
    crystal_maiden: "Crystal Maiden",
    dark_seer: "Dark Seer",
    dark_willow: "Dark Willow",
    dazzle: "Dazzle",
    death_prophet: "Death Prophet",
    disruptor: "Disruptor",
    doom_bringer: "Doom",
    dragon_knight: "Dragon Knight",
    drow_ranger: "Drow Ranger",
    earth_spirit: "Earth Spirit",
    earthshaker: "Earthshaker",
    elder_titan: "Elder Titan",
    ember_spirit: "Ember Spirit",
    enchantress: "Enchantress",
    enigma: "Enigma",
    faceless_void: "Faceless Void",
    furion: "Nature's Prophet",
    grimstroke: "Grimstroke",
    gyrocopter: "Gyrocopter",
    huskar: "Huskar",
    invoker: "Invoker",
    jakiro: "Jakiro",
    juggernaut: "Juggernaut",
    keeper_of_the_light: "Keeper of the Light",
    kunkka: "Kunkka",
    legion_commander: "Legion Commander",
    leshrac: "Leshrac",
    lich: "Lich",
    life_stealer: "Lifestealer",
    lina: "Lina",
    lion: "Lion",
    lone_druid: "Lone Druid",
    luna: "Luna",
    lycan: "Lycan",
    magnataur: "Magnus",
    mars: "Mars",
    medusa: "Medusa",
    meepo: "Meepo",
    mirana: "Mirana",
    monkey_king: "Monkey King",
    morphling: "Morphling",
    naga_siren: "Naga Siren",
    necrolyte: "Necrophos",
    nevermore: "Shadow Fiend",
    night_stalker: "Night Stalker",
    nyx_assassin: "Nyx Assassin",
    obsidian_destroyer: "Outworld Devourer",
    ogre_magi: "Ogre Magi",
    omniknight: "Omniknight",
    oracle: "Oracle",
    pangolier: "Pangolier",
    phantom_assassin: "Phantom Assassin",
    phantom_lancer: "Phantom Lancer",
    phoenix: "Phoenix",
    puck: "Puck",
    pudge: "Pudge",
    pugna: "Pugna",
    queenofpain: "Queen of Pain",
    rattletrap: "Clockwerk",
    razor: "Razor",
    riki: "Riki",
    rubick: "Rubick",
    sand_king: "Sand King",
    shadow_demon: "Shadow Demon",
    shadow_shaman: "Shadow Shaman",
    shredder: "Timbersaw",
    silencer: "Silencer",
    skeleton_king: "Wraith King",
    skywrath_mage: "Skywrath Mage",
    slardar: "Slardar",
    slark: "Slark",
    snapfire: "Snapfire",
    sniper: "Sniper",
    spectre: "Spectre",
    spirit_breaker: "Spirit Breaker",
    storm_spirit: "Storm Spirit",
    sven: "Sven",
    techies: "Techies",
    templar_assassin: "Templar Assassin",
    terrorblade: "Terrorblade",
    tidehunter: "Tidehunter",
    tinker: "Tinker",
    tiny: "Tiny",
    treant: "Treant Protector",
    troll_warlord: "Troll Warlord",
    tusk: "Tusk",
    undying: "Undying",
    ursa: "Ursa",
    vengefulspirit: "Vengeful Spirit",
    venomancer: "Venomancer",
    viper: "Viper",
    visage: "Visage",
    void_spirit: "Void Spirit",
    warlock: "Warlock",
    weaver: "Weaver",
    windrunner: "Windranger",
    winter_wyvern: "Winter Wyvern",
    wisp: "Io",
    witch_doctor: "Witch Doctor",
    zuus: "Zeus",
};  
const heroIdMap = {
    '1': 'antimage',
    '2': 'axe',
    '3': 'bane',
    '4': 'bloodseeker',
    '5': 'crystal_maiden',
    '6': 'drow_ranger',
    '7': 'earthshaker',
    '8': 'juggernaut',
    '9': 'mirana',
    '10': 'morphling',
    '11': 'nevermore',
    '12': 'phantom_lancer',
    '13': 'puck',
    '14': 'pudge',
    '15': 'razor',
    '16': 'sand_king',
    '17': 'storm_spirit',
    '18': 'sven',
    '19': 'tiny',
    '20': 'vengefulspirit',
    '21': 'windrunner',
    '22': 'zuus',
    '23': 'kunkka',
    '25': 'lina',
    '26': 'lion',
    '27': 'shadow_shaman',
    '28': 'slardar',
    '29': 'tidehunter',
    '30': 'witch_doctor',
    '31': 'lich',
    '32': 'riki',
    '33': 'enigma',
    '34': 'tinker',
    '35': 'sniper',
    '36': 'necrolyte',
    '37': 'warlock',
    '38': 'beastmaster',
    '39': 'queenofpain',
    '40': 'venomancer',
    '41': 'faceless_void',
    '42': 'skeleton_king',
    '43': 'death_prophet',
    '44': 'phantom_assassin',
    '45': 'pugna',
    '46': 'templar_assassin',
    '47': 'viper',
    '48': 'luna',
    '49': 'dragon_knight',
    '50': 'dazzle',
    '51': 'rattletrap',
    '52': 'leshrac',
    '53': 'furion',
    '54': 'life_stealer',
    '55': 'dark_seer',
    '56': 'clinkz',
    '57': 'omniknight',
    '58': 'enchantress',
    '59': 'huskar',
    '60': 'night_stalker',
    '61': 'broodmother',
    '62': 'bounty_hunter',
    '63': 'weaver',
    '64': 'jakiro',
    '65': 'batrider',
    '66': 'chen',
    '67': 'spectre',
    '68': 'ancient_apparition',
    '69': 'doom_bringer',
    '70': 'ursa',
    '71': 'spirit_breaker',
    '72': 'gyrocopter',
    '73': 'alchemist',
    '74': 'invoker',
    '75': 'silencer',
    '76': 'obsidian_destroyer',
    '77': 'lycan',
    '78': 'brewmaster',
    '79': 'shadow_demon',
    '80': 'lone_druid',
    '81': 'chaos_knight',
    '82': 'meepo',
    '83': 'treant',
    '84': 'ogre_magi',
    '85': 'undying',
    '86': 'rubick',
    '87': 'disruptor',
    '88': 'nyx_assassin',
    '89': 'naga_siren',
    '90': 'keeper_of_the_light',
    '91': 'wisp',
    '92': 'visage',
    '93': 'slark',
    '94': 'medusa',
    '95': 'troll_warlord',
    '96': 'centaur',
    '97': 'magnataur',
    '98': 'shredder',
    '99': 'bristleback',
    '100': 'tusk',
    '101': 'skywrath_mage',
    '102': 'abaddon',
    '103': 'elder_titan',
    '104': 'legion_commander',
    '105': 'techies',
    '106': 'ember_spirit',
    '107': 'earth_spirit',
    '108': 'abyssal_underlord',
    '109': 'terrorblade',
    '110': 'phoenix',
    '111': 'oracle',
    '112': 'winter_wyvern',
    '113': 'arc_warden',
    '114': 'monkey_king',
    '119': 'dark_willow',
    '120': 'pangolier',
    '121': 'grimstroke',
    '126': 'void_spirit',
    '128': 'snapfire',
    '129': 'mars'
};

export default function Hero({id, pos, addition= <div />}: {id: string; pos: number; addition?: ReactNode}): ReactElement {
    const shortName = heroIdMap[id];

    return <>
        <div className={'place'}>{pos}.</div>
        <div className={'avatar'}>
            <HeroAvatar heroClass={shortName} />
        </div>
        {heroNames[shortName]}

        {addition}

        <style jsx>{`

            .place {
                text-align: right;
            }

            .avatar {
                height: 30px;
                border-radius: 4px;
                width: 56px;
            }
        `}</style>
    </>;
}