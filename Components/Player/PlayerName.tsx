import { ReactElement, useMemo } from "react";
import { LeaguePlayer } from "../../pages";

const playerMap = {
    71869498: 'Luft',
    168785654: 'Blu3',
    78937420: 'PerTzo',
    117824047: 'Bigterrazzo',
    68020317: 'Nova',
    440711516: 'Nande',
    245548932: 'Kamek',
    66691128: 'Testeri',
    31078647: 'pas-',
    23589642: 'HoviteY',
    127815325: 'dogeasy',
    16497807: 'tOfu',
    177134449: 'hawk',
    61572531: 'Exed',
    72362988: 'DasSchaf',
    30908569: 'SQRL',
    37171865: 'RedOrc',
    107603651: 'liminality',
    87040627: 'Pulitzer Kenny',
    128771383: 'Shak',
    122182720: 'Zoretsheikh',
    115293699: 'ReiGn',
    122623272: 'Wooo',
    121066669: 'Argeus',
    87139174: 'hexOr',
    52798884: 'y50',
    86943634: 'Mightyjoe',
    115810875: 'WwieWaMBo',
    86817707: 'Ascendancy',
    100881709: 'Meta Walker',
    49896820: 'Kaito',
    887657854: 'samsam',
    348703642: 'b1kA.',
    86727231: 'ViGGo',
    24935423: 'killa',
    120865609: 'JinduJUN',
    121815583: 'Murock',
    20652618: 'realdivine',
    107482022: 'ryder',
    140297552: 'No!ob',
    14067214: 'TheBloodySky',
    42194450: 'Naturel',
    230608100: '-Zebrog;',
    176787621: 'Zus',
    106755427: 'Mickee',
    219225327: 'Ade',
    91741256: 'yarintheslayer',
    97676580: 'Neqroman',
    60943014: 'Jabbz',
    86738494: 'Vroksnak',
    98092287: 'Blazemon',
    91583948: 'Myron',
    90810663: 'hwa',
    75060705: 'Winou',
    113711310: 'Mangusu',
    177203952: 'Yuma',
    1062358752: 'Mego',
    431770905: 'MIYO',
    32128719: 'JMN',
}

export default function PlayerName({player}: {player: LeaguePlayer}): ReactElement {
    const name = useMemo(() => {
        if(playerMap[player.id]) {
            return playerMap[player.id];
        }
        
        if(player.proSteamAccount?.name) {
            return player.proSteamAccount.name;
        }

        return player.name;
    }, [player]);

    return <div className={'row'} data-id={player.id}>
        <img src={"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/" + player.avatar} alt="" className={'avatar'} />
        <a target={'_blank'} href={player.profileUri}>{name}</a>

        <style jsx>{`
            .row {
                display: flex;
                align-items: center;
            }

            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 4px;
                object-fit: cover;
                margin-right: 10px;
            }
        `}</style>
    </div>;
}