let currentEffect = null
class YouTubeChannel {
  subscribers
  _value
  constructor(value) {
    this.subscribers = new Set()
    this._value = value
  }
  get value () {
    // Đăng ký kênh và subcribe
    this.subscribe()
    return this._value
  }
  set value(value) {
    this._value = value
    this.notify() 
  }
  subscribe() {
    if(currentEffect){
      this.subscribers.add(currentEffect)
    }
  }
  notify() {
    this.subscribers.forEach((subscribe) => {
      subscribe()
    })
  }
}
function watchEffect(effect) {
  currentEffect = effect
  effect()
  currentEffect = null
}
function computed(getter) {
  const result = ref(null) 
  watchEffect(() => {
    result.value = getter() 
  })
  return result
}
function ref(rawValue) {
  return new YouTubeChannel(rawValue)
}
const channel1 = ref('Truyen 2k3')
const channel2 = computed(() => {
  return 'Xin chào, ' + channel1.value
})
watchEffect(() => {
  console.log('Nội dung kênh 2:', channel2.value)
})
channel1.value = 'Truyen 1'
