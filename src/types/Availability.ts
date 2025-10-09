import type { ValueOf } from './ValueOf'

const Availability = {
  /**
   * 세션을 즉시 만들 수 있습니다.
   */
  Available: 'available',
  /**
   * 다운로드가 진행 중이며 세션을 사용하려면 다운로드가 완료되어야 합니다.
   */
  Downloading: 'downloading',
  /**
   * 세션을 만들려면 추가 다운로드가 필요하며 여기에는 전문가 모델, 언어 모델 또는 미세 조정이 포함될 수 있습니다.
   * create()를 호출하려면 사용자 활성화가 필요할 수 있습니다.
   */
  Downloadable: 'downloadable',
  /**
   * 사용자의 기기 또는 요청된 세션 옵션이 지원되지 않습니다. 기기의 전원이나 디스크 공간이 부족할 수 있습니다.
   */
  Unavailable: 'unavailable',
} as const

type Availability = ValueOf<typeof Availability>

export default Availability
