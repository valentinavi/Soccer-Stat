export default class Servise {
    constructor(props) {
        this._apiBase = 'https://api.football-data.org/v2'; 
        this._myToken = '986e2e71e3d042da893dbb5317f3b0db'
    }
    
    getResourse = async (url) => {
        console.log('sdddfff', url);
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-Auth-Token': `${this._myToken}`
            }
        });

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        console.log('resss', res);
            return await res.json(); 
    }   

    getAllTeams = async (id) => {
        const res = await this.getResourse(`/competitions/${id}/teams`);
        return res;
    }
    getFoundTeam = async (id) => {
        const res = await this.getResourse(`/teams/${id}`);
        return res;
    }
    getFoundTeamsByYear = async (id, year) => {
        const res = await this.getResourse(`/competitions/${id}/teams?season=${year}`);
        return res;
    }

    getTeamsCalendar = async (id) => {
        const res = await this.getResourse(`/teams/${id}/matches`);
        return res;
    }

    getTeamCalendarByDate = async (id, start, end) => {
        const res = await this.getResourse(`/teams/${id}/matches?dateFrom=${start}&dateTo=${end}`);
        return res;
    }
    
    getAllLeagues = async () => {
        const res = await this.getResourse(`/competitions?plan=TIER_ONE`);
        return res;
    }
    getLeagueCalendar = async (id) => {
        const res = await this.getResourse(`/competitions/${id}/matches`);
        return res;
    }

    getFoundLeagues = async (id) => {
        const res = await this.getResourse(`/competitions/${id}`);
        return res;
    }

    getFoundLeaguesCalendarByDate = async (id, start, end) => {
        const res = await this.getResourse(`/competitions/${id}/matches/?dateFrom=${start}&dateTo=${end}`);
        return res;
    }
    
    getFoundLeaguesCalendarByYear = async (id, year) => {
        const res = await this.getResourse(`/competitions/${id}/matches?season=${year}`);
        return res;
    }
   
}
