import { Availability } from '~/types'

const getAvailabilityMessage = (availability: Availability | null) => {
  switch (availability) {
    case Availability.Available:
      return '✅ Glancy 요약기를 바로 사용할 수 있습니다.'
    case Availability.Downloading:
      return '⬇️ 다운로드가 진행 중입니다. 완료 후 사용할 수 있습니다.'
    case Availability.Downloadable:
      return '🚧 모델 다운로드가 필요합니다.'
    case Availability.Unavailable:
      return '❌ 이 기기에서는 사용할 수 없습니다. 기기의 전원이나 디스크 공간을 확인해주세요.'
    default:
      return '⏳ 확인 중...'
  }
}

export default getAvailabilityMessage
