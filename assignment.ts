function sendRequest2(
    stationID2: number,
    command: string | null,
     payload?: number | string | null
    ){
        const url = `https://api-energy-k8s.test.virtaglobal.com/v1/tests/${stationID2}`;
        const body = {command, payload};

        try {

        } catch (error){

        }


}