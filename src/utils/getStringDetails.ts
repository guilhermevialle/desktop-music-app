interface MusicInfo {
  title: string;
  artist: string;
}

export default function extractTitleAndArtist(musicPath: string): MusicInfo {
  let title: string = "";
  let artist: string = "";
  
  // Removendo a extensão .mp3 da string de entrada
  musicPath = musicPath.replace(".mp3", "");
  
  // Encontrando o índice do caractere que separa o título do artista
  let separatorIndex = musicPath.indexOf(" - ");
  if (separatorIndex === -1) {
    separatorIndex = musicPath.indexOf(" by ");
  }
  if (separatorIndex === -1) {
    separatorIndex = musicPath.indexOf(" | ");
  }
  
  // Extraindo o título e o artista da string usando o índice do separador
  if (separatorIndex !== -1) {
    artist = musicPath.substring(0, separatorIndex);
    title = musicPath.substring(separatorIndex + 3); // Adicionando 3 caracteres para pular o separador
  } else if (musicPath.trim() !== "") {
    artist = musicPath; // Se não encontrar um separador, assume-se que a string representa apenas o título
    title = "Unknown"; // Se o artista não puder ser extraído, atribui-se 'Unknown' à variável
  } else {
    artist = "Unknown"; // Se a string de entrada for vazia, atribui-se 'Unknown' ao título
    title = "Unknown";
  }
  
  // Retornando o título e o artista em um objeto
  return {
    title,
    artist,
  };
}
