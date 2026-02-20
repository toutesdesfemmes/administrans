import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

export function textToArrays(text, separator = ',', padding = 0) {
  let v = text || ''
  let final = []
  if (v.length > 0) {
    v.split('\n').forEach((r) => {
      let parts = r.split(separator).map((v) => {
        return v.trim()
      })
      final.push(parts)
    })
  }
  while (final.length < padding) {
    final.push([])
  }
  return final
}

export function renderMarkdown(text) {
  return DOMPurify.sanitize(marked.parse(text))
}
