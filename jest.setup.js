import '@testing-library/jest-dom'

// Mock fetch global para Apollo Client funcionar no ambiente de teste
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn()
}

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props) {
    // Remove propriedades específicas do Next.js Image que não são válidas em <img>
    const { fill, priority, sizes, ...imgProps } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />
  },
}))

// Mock do next/link
jest.mock('next/link', () => {
  return function Link({ children, href }) {
    return <a href={href}>{children}</a>
  }
})

// Mock do next/navigation
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

