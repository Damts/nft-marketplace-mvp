import type { Nft } from '../lib/types';

const img = (n: number) => `https://picsum.photos/seed/nft${n}/400/400`;

export const NFTS: Nft[] = [
  { id: 'nft_emerald_ape_042', name: 'Emerald Ape #042', collection: 'Kurio Apes', price: '1.19', image: img(1), edition: '1/50', editions: 50, available: 12, rare: true, attributes: ['Óculos', 'Esmeralda', 'Raro'], description: 'Um colecionável digital finalizado à mão da coleção Kurio Editions.', network: 'Ethereum' },
  { id: 'nft_sage_nomad_009', name: 'Sage Nomad #009', collection: 'Nomads', price: '1.69', image: img(2), edition: '1/10', editions: 10, available: 3, attributes: ['Chapéu', 'Verde'], description: 'Nômade sábio da coleção Nomads.', network: 'Ethereum' },
  { id: 'nft_neon_vessel_552', name: 'Neon Vessel #552', collection: 'Vessels', price: '1.99', image: img(3), edition: '1/100', editions: 100, available: 40, rare: true, attributes: ['Neon', 'Vaso'], description: 'Vaso neon da coleção Vessels.', network: 'Polygon' },
  { id: 'nft_cosmic_bloom_118', name: 'Cosmic Bloom #118', collection: 'Blooms', price: '1.29', image: img(4), edition: '1/25', editions: 25, available: 8, attributes: ['Cósmico', 'Flor'], description: 'Flor cósmica da coleção Blooms.', network: 'Ethereum' },
  { id: 'nft_violet_nomad_314', name: 'Violet Nomad #314', collection: 'Nomads', price: '1.39', image: img(5), edition: '1/10', editions: 10, available: 2, attributes: ['Violeta'], description: 'Nômade violeta.', network: 'Solana' },
  { id: 'nft_ivory_baron_088', name: 'Ivory Baron #088', collection: 'Barons', price: '1.79', image: img(6), edition: '1/50', editions: 50, available: 15, attributes: ['Marfim'], description: 'Barão marfim.', network: 'Ethereum' },
  { id: 'nft_golden_beat_207', name: 'Golden Beat #207', collection: 'Beats', price: '0.99', image: img(7), edition: '1/200', editions: 200, available: 60, attributes: ['Dourado', 'Música'], description: 'Beat dourado.', network: 'Polygon' },
  { id: 'nft_golden_frequency_071', name: 'Golden Frequency #071', collection: 'Beats', price: '0.59', image: img(8), edition: '1/200', editions: 200, available: 90, attributes: ['Frequência'], description: 'Frequência dourada.', network: 'Solana' },
  { id: 'nft_golden_signal_160', name: 'Golden Signal #160', collection: 'Signals', price: '0.39', image: img(9), edition: '1/500', editions: 500, available: 200, attributes: ['Sinal'], description: 'Sinal dourado.', network: 'Ethereum' },
  { id: 'nft_cosmic_drift_011', name: 'Cosmic Drift #011', collection: 'Drifts', price: '2.49', image: img(10), edition: '1/5', editions: 5, available: 1, rare: true, attributes: ['Raro', 'Drift'], description: 'Drift cósmico raro.', network: 'Ethereum' },
  { id: 'nft_pixel_ape_007', name: 'Pixel Ape #007', collection: 'Pixel Apes', price: '0.75', image: img(11), edition: '1/1000', editions: 1000, available: 300, attributes: ['Pixel'], description: 'Ape pixelado.', network: 'Polygon' },
  { id: 'nft_neon_city_033', name: 'Neon City #033', collection: 'Cities', price: '1.05', image: img(12), edition: '1/75', editions: 75, available: 20, attributes: ['Neon', 'Cidade'], description: 'Cidade neon.', network: 'Solana' },
];

export const COLLECTIONS = ['Arte digital', 'Fotografia', 'Música', 'Arte 3D', 'Colecionáveis', 'Generativa', 'Jogos', 'Assinaturas', 'Utilidade'];
export const NETWORKS = ['Ethereum', 'Polygon', 'Solana'];