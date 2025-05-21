import process from 'node:process';

const VOICEOVER_RESERVED_ES = {
  SELECTED: 'seleccionado',
  TAB: 'tabulador',
  TABPANEL: 'panel de pestaña',
};

const VOICEOVER_RESERVED_EN = {
  SELECTED: 'selected',
  TAB: 'tab',
  TABPANEL: 'tab panel',
};

export const VOICEOVER_RESERVED = process.env.VOICEOVER_LANG.includes('es')
  ? VOICEOVER_RESERVED_ES
  : VOICEOVER_RESERVED_EN;
