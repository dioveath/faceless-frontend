import { useState, useEffect } from 'react'

/**
 * A custom hook that returns a boolean indicating whether the given media query matches.
 * 
 * @param query - A string representing the media query to evaluate.
 * @returns A boolean value that is true if the media query matches, false otherwise.
 * 
 * @example
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
