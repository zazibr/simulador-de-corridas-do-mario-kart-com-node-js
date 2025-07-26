const player1 = {
    NOME : "Mário",
    VELOCIDADE : 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;
    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.6):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} dado de ${block}  ${diceResult} + ${attribute} = ${diceResult + attribute}`);    
}

async function playRaceEngine(character1,character2) {

    // teste de habilidade
    let totalSkill_1 = 0;
    let totalSkill_2 = 0;
    
    for (let round = 1; round <= 5; round++) {
        console.log(`\nRodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco : ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();


        if (block === "RETA") {
            totalSkill_1 = diceResult1 + character1.VELOCIDADE;
            totalSkill_2 = diceResult2 + character1.VELOCIDADE;
    
            await logRollResult(
                character1.NOME, 
                "velocidade", 
                diceResult1, 
                character1.VELOCIDADE
            );
    
            await logRollResult(
                character2.NOME, 
                "velocidade", 
                diceResult1, 
                character2.VELOCIDADE
            );
               
        }
    
        if (block === "CURVA") {
            totalSkill_1 = diceResult1 + character1.MANOBRABILIDADE;
            totalSkill_2 = diceResult2 + character2.MANOBRABILIDADE;
    
            await logRollResult(
                character1.NOME, 
                "manobrabilidade", 
                diceResult1, 
                character1.MANOBRABILIDADE
            );
    
            await logRollResult(
                character2.NOME, 
                "manobrabilidade", 
                diceResult1, 
                character2.MANOBRABILIDADE
            );
            
        }
    
        if (block === "CONFRONTO") {
            let powerResult = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
    
            // totalSkill_1 = diceResult1 + character1.PODER;
            // totalSkill_2 = diceResult2 + character2.PODER;
    
    
            // await logRollResult(
            //     character1.NOME, 
            //     "poder", 
            //     diceResult1, 
            //     character1.PODER
            // );
    
            // await logRollResult(
            //     character2.NOME, 
            //     "poder", 
            //     diceResult1, 
            //     character2.PODER
            // );
        }

        //
        // verificando o vencedor
        //
        if (totalSkill_1 > totalSkill_2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalSkill_2 > totalSkill_1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log( "---------------------------------------------------------------------------" );
        // console.log(`${character1.NOME} tem ${character1.PONTOS} pontos`);
        // console.log(`${character2.NOME} tem ${character2.PONTOS} pontos`);
    }






}

(async function main() {
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`);

    await playRaceEngine(player1, player2);
})(); // função auto-invocada para iniciar o jogo