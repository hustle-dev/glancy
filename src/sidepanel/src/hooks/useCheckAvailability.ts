import { useQuery } from '@tanstack/react-query'

const useCheckAvailability = () => {
  return useQuery({
    queryKey: ['summarizer', 'availability'],
    queryFn: async () => {
      if (!('Summarizer' in self)) {
        throw new Error('Summarizer API를 지원하지 않는 브라우저입니다.')
      }
      const status = await self.Summarizer.availability()
      return status
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}

export default useCheckAvailability
