import { describe, it, expect } from 'vitest'
import { esAliasTerms } from './search-es.js'

describe('esAliasTerms', () => {
  it('maps a full Spanish term to its English substrings', () => {
    expect(esAliasTerms('sentadilla')).toContain('squat')
  })

  it('maps a prefix of a term (key.includes(ql))', () => {
    expect(esAliasTerms('sentad')).toContain('squat')
  })

  it('returns every alias for a term with several', () => {
    const out = esAliasTerms('polea')
    expect(out).toContain('cable')
    expect(out).toContain('pulldown')
  })

  it('ignores queries under 3 chars (no false positives)', () => {
    // "ba" used to inject bench/barbell/bar/band from banca/barra/banda.
    expect(esAliasTerms('ba')).toEqual([])
  })

  it('returns [] for empty query', () => {
    expect(esAliasTerms('')).toEqual([])
  })

  it('returns [] for a query with no Spanish match', () => {
    expect(esAliasTerms('zzz')).toEqual([])
  })
})
