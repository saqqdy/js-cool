import { ref, computed } from 'vue'
import en from './en'
import zh from './zh'

export type Locale = 'en' | 'zh'
export type Messages = typeof en

const messages: Record<Locale, Messages> = { en, zh }

const currentLocale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'en')

export const useI18n = () => {
  const t = computed(() => messages[currentLocale.value])
  const locale = computed(() => currentLocale.value)

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'en' ? 'zh' : 'en')
  }

  return { t, locale, setLocale, toggleLocale }
}
