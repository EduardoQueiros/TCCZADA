// utils/ImagemUtils.js
export function formatarImagemBase64(imagem) {
    if (!imagem) return null; // Retorna nulo se não houver imagem
    if (imagem.startsWith("/9j")) return `data:image/jpeg;base64,${imagem}`; // JPEG
    if (imagem.startsWith("iVBOR")) return `data:image/png;base64,${imagem}`; // PNG
    return `data:image/*;base64,${imagem}`; // Fallback genérico
  }
  