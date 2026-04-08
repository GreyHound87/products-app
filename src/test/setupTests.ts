function noop(): void {
  void 0
}

class ResizeObserverStub {
  observe(): void {
    noop()
  }

  unobserve(): void {
    noop()
  }

  disconnect(): void {
    noop()
  }
}

globalThis.ResizeObserver = ResizeObserverStub

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false,
  }),
})

const getComputedStyleOrig = window.getComputedStyle.bind(window)
window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  if (pseudoElt) {
    return { getPropertyValue: () => '' } as unknown as CSSStyleDeclaration
  }
  return getComputedStyleOrig(elt)
}
