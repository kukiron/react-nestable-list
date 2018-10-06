export const closest = (target, selector) => {
  while (target) {
    if (target.matches && target.matches(selector)) return target
    target = target.parentNode
  }
  return null
}

export const getOffsetRect = elem => {
  // (1)
  const box = elem.getBoundingClientRect()
  const body = document.body
  const docElem = document.documentElement

  // (2)
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

  // (3)
  const clientTop = docElem.clientTop || body.clientTop || 0
  const clientLeft = docElem.clientLeft || body.clientLeft || 0

  // (4)
  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left) }
}

export const getTotalScroll = elem => {
  let top = 0
  let left = 0

  while ((elem = elem.parentNode)) {
    top += elem.scrollTop || 0
    left += elem.scrollLeft || 0
  }

  return { top, left }
}

export const getTransformProps = (x, y) => ({
  transform: "translate(" + x + "px, " + y + "px)"
})

export const formatData = object => {
  let id = 0
  const fn = o =>
    (text =>
      Object.assign(
        { id: id++, text },
        { position: o[text].position },
        {
          children: o[text].employees.map(fn)
        }
      ))(Object.keys(o)[0])

  const result = fn(object)
  return [result]
}

export const loadFromLocalStorage = () =>
  // for dev: if localStorage already has data from before at the port
  // then it won't work, so putting a check for it
  localStorage.length && localStorage["employeeList"]
    ? JSON.parse(localStorage["employeeList"])
    : []

export const isJson = str => {
  const filetype = "json"
  const filetypeLen = filetype.length
  const filenameLen = str.length

  return str.slice(filenameLen - filetypeLen, filenameLen) === filetype
}
