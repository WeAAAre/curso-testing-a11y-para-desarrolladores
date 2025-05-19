import process from 'node:process';

const VOICEOVER_RESERVED_ES = {
  SELECTED: 'seleccionado',
  TAB: 'tabulador',
};

const VOICEOVER_RESERVED_EN = {
  SELECTED: 'selected',
  TAB: 'tab',
};

export const VOICEOVER_RESERVED = process.env.VOICEOVER_LANG.includes('es')
  ? VOICEOVER_RESERVED_ES
  : VOICEOVER_RESERVED_EN;
