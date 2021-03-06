import { ReactElement } from "react";
import {promises as fs} from 'fs';
import { TeamStats, TeamOverview, Stats } from "..";
import TopPicks from "../../Components/TopPicks";
import {PageHeader} from 'antd';
import TopBans from "../../Components/TopBans";
import TeamPlayers from "../../Components/TeamPlayers";
import TeamStatsComponent from "../../Components/TeamStats";
import Head from 'next/head';

//#region <interface>
interface PickBan {
    isPick: boolean;
    heroId: number;
    order: number;
    bannedHeroId: number;
    isRadiant: boolean;
    playerIndex: number;
    wasBannedSuccessfully: boolean;
}

export interface HeroPlayer {
    matchId: number;
    playerSlot: number;
    heroId: number;
    steamAccountId: number;
    isRadiant: boolean;
    numKills: number;
    numDeaths: number;
    numAssists: number;
    leaverStatus: number;
    numLastHits: number;
    numDenies: number;
    goldPerMinute: number;
    experiencePerMinute: number;
    level: number;
    gold: number;
    goldSpent: number;
    heroDamage: number;
    towerDamage: number;
    isRandom: boolean;
    lane: number;
    intentionalFeeding: boolean;
    role: number;
    imp: number;
    award: number;
    item0Id: number;
    item1Id: number;
    item3Id: number;
    item4Id: number;
    behavior: number;
    heroHealing: number;
    roamLane: number;
    isVictory: boolean;
    networth: number;
    neutral0Id: number;
    imp2: number
}

export interface LeagueMatch {
    id: number;
    didRadiantWin: boolean;
    durationSeconds: number;
    startDateTime: number;
    clusterId: number;
    firstBloodTime: number;
    lobbyType: number;
    numHumanPlayers: number;
    gameMode: number;
    replaySalt: number;
    isStats: boolean;
    avgImp: number;
    parsedDateTime: number;
    statsDateTime: number;
    leagueId: number;
    radiantTeamId: number;
    direTeamId: number;
    seriesId: number;
    gameVersionId: number;
    regionId: number;
    sequenceNum: number;
    rank: number;
    bracket: number;
    endDateTime: number;
    analysisOutcome: number;
    predictedOutcomeWeight: number;
    pickBans: Array<PickBan>;
    players: Array<HeroPlayer>;
}
//#endregion

const teams = {
    "-1918443542": {
        "name": "T21959"
    },
    "-1729877108": {
        "name": "T25819"
    },
    "-1393711083": {
        "name": "T77151"
    },
    "-1017211975": {
        "name": "T43114"
    },
    "-846926853": {
        "name": "T33111"
    },
    "-683121991": {
        "name": "T41943"
    },
    "1055544": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/795189696154552749/A252F3DBDAEC7D4E45489404A30A143B67F37A31/",
        "name": "Hehe United.",
        "points": 42
    },
    "2004765": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/544150006526370049/C8D1C0C08D875301A44297F54731A16685724E02/",
        "name": "G L O R I A B O Y S"
    },
    "4448822": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1054352522749972375/668B97800A968E5AF6F7D9A8BBD4F872C837288D/",
        "name": "Team Destiny",
        "points": 24
    },
    "5251791": {
        "name": "LFT"
    },
    "7328859": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1008184435890691984/6D492CCC3210AA17D2770B6D527CF883A6E9A451/",
        "name": "axXez Sports"
    },
    "7734344": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/769491390871956563/02DDC49944E77816098E973529AA7D73D7B0DF3C/",
        "name": "EURONICS Gaming",
        "points": 33
    },
    "7750343": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1029581453642932676/E093B03118FD302A494B28C241983E73D49AF242/",
        "name": "5UpJungz",
        "points": 42
    },
    "7766084": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1021700308759877180/D87CBCBFEA994D3FA4C5F643A392C96E8BF16F12/",
        "name": "Abfahrt",
        "points": 0
    },
    "7871207": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1030706086619415026/C546E982873DE584297AF8323FEFB81A3A3B5795/",
        "name": "Playing Ducks",
        "points": 18
    },
    "7938593": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1282912715390985407/66CC01BCBA065FE9A613448C1BB69F50ACCDE707/",
        "name": "IVY",
        "points": 9
    },
    "7958903": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1012692738743753088/8F41D793F4767F5A756AABA0BDA85F7F4D2D0CB5/",
        "name": "eSport Rhein-Neckar",
        "points": 36
    },
    "7976730": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1027329487627672800/87A6AB639457163C88F2A26AFB1FF29360BE6FBD/",
        "name": "Recast Gaming",
        "points": 54
    },
    "7978241": {
        "name": "patodandovueltashd"
    },
    "7978292": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1043093473191570181/A5A413F39ABF6E4F1116005BC310C22838A052F0/",
        "name": "airGERlich",
        "points": 39
    },
    "7978409": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1023951825314745095/10E0323F618222904591701A8435AB75A7C52343/",
        "name": "Topf voll Otter",
        "points": 45
    },
    "7979749": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1260393964683820026/0CC8E06B310A6EBA66687643FD9F69A3D0961E66/",
        "name": "Kolossus",
        "points": 18
    },
    "7979964": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1018323012512176704/6940B2879EAE955C64D6452A107F1124EF04C863/",
        "name": "TT willhaben"
    },
    "8048837": {
        "avatar": "https://steamusercontent-a.akamaihd.net/ugc/1300927214142085957/BA41B1B9166A0B1B242DD416E2AA857BB88022A6/",
        "name": "Last Minute In It"
    },
    "8083639": {
        "name": "Free Agents"
    }
};

const Team = ({teamId, teamMatches, playersInTeam, players, teamStats, teamOverview}: {teamId: number; teamMatches: LeagueMatch[]; playersInTeam: number[]; players: TeamStats['leaguePlayers']; teamOverview: TeamOverview; teamStats: Stats}): ReactElement => {
    const team = teams[teamId];
    return <>
        <Head>
            <title>ESLM Season 1 - {team.name}</title>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

            <meta property="og:site_name" content="StreamDota - Your toolbox for streaming dota"/>
            <meta property="og:title" content={'Dota bot, overlays, stats & more'}/>
            <meta property="og:description" content={'Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more...'}/>
            <meta property="og:image" content={'/shared/share.png'}/>
            <meta property="og:url" content="https://streamdota.com/"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="description" content="Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more..."/>

            <link rel="apple-touch-icon" sizes="180x180" href="/shared/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/shared/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/shared/favicon-16x16.png" />
            <link rel="manifest" href="/shared/site.webmanifest" />
            <link rel="mask-icon" href="/shared/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/shared/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/shared/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>

        <PageHeader
            onBack={() => window.history.back()}
            title={<div className={'row'}>
                {team.avatar && team.avatar.length > 0 && <div className={'avatar'}><img className={'img'} src={team.avatar} width={120}/></div>}
                <div>{team.name}</div>
            </div>}
        >
            <br />
            <br />
            <TeamStatsComponent teamStats={teamStats} teamOverview={teamOverview} />
            <br />
            <br />
            <TopPicks matches={teamMatches} teamId={teamId}/>
            <br />
            <br />
            <TopBans matches={teamMatches} teamId={teamId}/>
            <br />
            <br />
            <TeamPlayers playersInTeam={playersInTeam} players={players} matches={teamMatches}/>
        </PageHeader>

        <style jsx>{`
            .row {
                display: flex;
                align-items: center;
            }

            .avatar {
                margin-right: 10px;
            }

            .img {
                object-fit: cover;
            }
        `}</style>
    </>
}

export async function getStaticPaths() {
    const rawTeams = await fs.readFile('./data/teams.json');
    const response: TeamStats = JSON.parse(rawTeams as unknown as string);
    const teamIds = Object.keys(response.leagueTeams);

  return {
    paths: teamIds.map((teamId) => ({params: {teamId}})),
    fallback: false,
  };
}

const minDate = 1589846400;

export async function getStaticProps({params: {teamId}}) {
    const rawMatches = await fs.readFile('./data/matches.json');
    const rawTeams = await fs.readFile('./data/teams.json');
    const allMatches: LeagueMatch[] = JSON.parse(rawMatches as unknown as string);
    const teamMatches = allMatches
        .filter(({startDateTime, radiantTeamId, direTeamId}) => (direTeamId === +teamId || radiantTeamId === +teamId) && (startDateTime >= minDate));

    const response: TeamStats = JSON.parse(rawTeams as unknown as string);
    const players = response.leaguePlayers;
    const playersInTeam = teamMatches.reduce<Set<number>>((acc, match) => {
        const teamRadiant = match.radiantTeamId === +teamId;
        match.players.forEach((player) => {
            if(player.isRadiant === teamRadiant) {
                acc.add(player.steamAccountId);
            }
        })

        return acc;
    }, new Set());

    const teamOverview = response.leagueTableTeam.overview.find(({teamId: id}) => +id === +teamId);
    const teamStats = response.leagueTableTeam.stats.find(({teamId: id}) => +id === +teamId);

    return {
      props: {
          players,
          playersInTeam: [...playersInTeam.values()],
          teamMatches,
          teamId: +teamId,
          teamStats,
          teamOverview,
        },
    }
  }
  

export default Team;