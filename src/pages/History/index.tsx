import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR  from 'date-fns/locale/pt-BR'
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from "./styles";
import { Trash } from 'phosphor-react';

export function History() {
    const { cycles, deleteCycle } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                       {cycles.map(cycle => {
                        return (
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                    addSuffix: true,
                                    locale: ptBR,
                                })}</td>
                                <td>
                                    {cycle.finishedDate && (
                                        <Status statusColor='green'>Concluído</Status>
                                    )}

                                    {cycle.interruptedDate && (
                                        <Status statusColor='red'>Interrompido</Status>
                                    )}

                                    {!cycle.finishedDate && !cycle.interruptedDate && (
                                        <Status statusColor='yellow'>em andamento</Status>
                                    )}
                                </td>

                                <td onClick={() => deleteCycle(cycle.id)}>
                                    <button>
                                        <Trash size={22}/>
                                    </button>
                                </td>
                            </tr>
                        )
                       })}
                    </tbody>
                   <tfoot></tfoot>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}