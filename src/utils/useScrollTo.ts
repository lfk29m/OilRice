export const useScrollTo = (id: string) => {
  const element = document.querySelector<HTMLBaseElement>(`#${id}`)
  if (!element) return
  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth',
  })
}
