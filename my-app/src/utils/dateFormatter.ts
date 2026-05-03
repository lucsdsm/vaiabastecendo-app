export function formatarTempoDecorrido(dataString: string): string {
    const dataAtualizacao = new Date(dataString);
    const dataAtual = new Date();
    
    // Diferença em segundos
    const diffSegundos = Math.floor((dataAtual.getTime() - dataAtualizacao.getTime()) / 1000);

    if (diffSegundos < 60) {
        return 'agora mesmo ';
    }

    const diffMinutos = Math.floor(diffSegundos / 60);
    if (diffMinutos < 60) {
        return `Há ${diffMinutos} minuto${diffMinutos > 1 ? 's' : ''} `;
    }

    const diffHoras = Math.floor(diffMinutos / 60);
    if (diffHoras < 24) {
        return `Há ${diffHoras} hora${diffHoras > 1 ? 's' : ''} `;
    }

    const diffDias = Math.floor(diffHoras / 24);
    if (diffDias < 30) {
        return `Há ${diffDias} dia${diffDias > 1 ? 's' : ''} `;
    }

    // Se for muito antigo, mostra a data normal (ex: 02/05/2026)
    return `Em ${dataAtualizacao.toLocaleDateString('pt-BR')} `;
}