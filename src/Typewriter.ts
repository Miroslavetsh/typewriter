interface ITypewriter {
  typeString: (string: string) => void
  start: () => void
  pauseFor: (duration: number) => void
  deleteChars: (amount: number) => void
  deleteAll: (deletingSpeed: number) => void
}

type Options = {
  loop?: boolean
  typingSpeed?: number
  deletingSpeed?: number
}

type QueueCallback = () => Promise<void>

export default class Typewriter implements ITypewriter {
  #queue: Array<QueueCallback> = []
  #element: HTMLElement
  #loop: boolean
  #typingSpeed: number
  #deletingSpeed: number

  constructor(parent: HTMLElement, { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}) {
    this.#element = document.createElement('div')
    parent.append(this.#element)

    this.#loop = loop
    this.#typingSpeed = typingSpeed
    this.#deletingSpeed = deletingSpeed
  }

  typeString(string: string) {
    this.#addToQueue((resolve) => {
      let i = 0

      const interval = setInterval(() => {
        this.#element.append(string[i])
        i++

        if (i >= string.length) {
          clearInterval(interval)
          resolve()
        }
      }, this.#typingSpeed)
    })

    return this
  }

  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      setTimeout(resolve, duration)
    })

    return this
  }

  deleteChars(amount: number) {
    this.#addToQueue((resolve) => {
      let i = 0

      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1,
        )

        i++

        if (i >= amount) {
          clearInterval(interval)
          resolve()
        }
      }, this.#deletingSpeed)
    })

    return this
  }

  deleteAll(deletingSpeed: number = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1,
        )

        if (this.#element.innerText.length === 0) {
          clearInterval(interval)
          resolve()
        }
      }, deletingSpeed)
    })

    return this
  }

  async start() {
    let cb = this.#queue.shift()

    while (cb !== undefined) {
      await cb()
      if (this.#loop) this.#addToQueue(cb)

      cb = this.#queue.shift()
    }

    return this
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => new Promise(cb))
  }
}
