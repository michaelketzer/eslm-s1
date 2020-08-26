import { ReactElement, useMemo } from "react";
import { LeaguePlayer } from "../../pages";

export default function PlayerName({player}: {player: LeaguePlayer}): ReactElement {
    const name = useMemo(() => {
        if(player.proSteamAccount?.name) {
            return player.proSteamAccount.name;
        }

        return player.name;
    }, [player]);

    return <div className={'row'}>
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