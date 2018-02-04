# GeneticAlgorithmChickensAndFoxes
<a href="https://paulohrodrigues.github.io/GeneticAlgorithmChickensAndFoxes/"><h2>Demo</h2></a>
</br>

Algoritmo simples que segue o conceito de IA - Algoritmo Genético<br><br>

<p>As galinhas são soltas todas no mesmo ponto. O objetivo é fazer com que elas consigam dá o máximo de passos possíveis sem encontrar nenhuma raposa, se conseguirem 20 passos sem morrerem então elas são consideradas evoluídas.</p>

<p> Ao serem soltas elas recebem características aleatórias que representam suas futuras movimentações.
Tais características são representadas por 4 letras possíveis em uma lista(array) de 20 posições, cada posição é 1 passo que a galinha dará:</p>

<p> l - Esquerda </p>
<p> r - Direita </p>
<p> u - Acima </p>
<p> d - Baixo </p>

<p> Formato exemplo: [ "l", "l", "r", "d", "l", "u", "u", "u", "l", "l", "d", "r", "d", "l", "r", "r", "r", "l", "d","d"]</p>

<p>Depois de iniciar a população de galinhas, elas irão caminhar pelo cenário e quando completarem os 20 passos então serão avaliadas e realocadas para a próxima etapa.</p>
<p>Agora nessa nova etapa é necessário cruzar as galinhas que passaram na avaliação, caso tenha tido alguma morte na etapa anterior então o cruzamento é feito com algumas mutações, caso contrário o cruzamento é feito meio a meio, com metade das características herdadas do "Pai" e a outra metade da "Mãe", para manter a população perfeita intacta. Caso haja clonagem os mesmo são removidos.</p>

<p>Finalizado a etapa de cruzamento, as novas galinhas juntamente com seus pais são novamente soltas no senário e reavaliadas, isso tudo vai se repetir até que toda população tenha características aceitáveis para serem consideradas evoluídas.</p>
<br>
OBSERVAÇÕES: A escala para medir o desempenho dos indivíduos vai de 0 a 20 (Aplicação do conceito de ordem de grandeza). E o acompanhamento gráfico é feito com a media geral dos resultados obtidos.
