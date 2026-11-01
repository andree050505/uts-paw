import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage.js'

// ── Mock localStorage ─────────────────────────────────────────────────────
const storageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = value },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(global, 'localStorage', { value: storageMock, writable: true })

beforeEach(() => storageMock.clear())

// ══════════════════════════════════════════════════════════════════════════
// Test 10 — useLocalStorage: menyimpan nilai baru ke localStorage
// ══════════════════════════════════════════════════════════════════════════
describe('useLocalStorage', () => {
  it('menggunakan nilai awal jika localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('tes', 'default'))
    expect(result.current[0]).toBe('default')
  })

  // Test 11 — useLocalStorage: nilai berubah tersimpan ke localStorage
  it('menyimpan nilai baru ke localStorage saat diubah', () => {
    const { result } = renderHook(() => useLocalStorage('tes', null))
    act(() => result.current[1]('nilaiBaru'))
    expect(storageMock.getItem('tes')).toBe('"nilaiBaru"')
  })

  // Test 12 — useLocalStorage: membaca nilai yang sudah ada di localStorage
  it('membaca nilai yang sudah tersimpan di localStorage', () => {
    storageMock.setItem('tes', JSON.stringify([1, 2, 3]))
    const { result } = renderHook(() => useLocalStorage('tes', []))
    expect(result.current[0]).toEqual([1, 2, 3])
  })
})
