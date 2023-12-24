import axios from 'axios'

const baseUrl = 'https://webhook.site/9ae38875-48e7-4631-b467-24d0134eea3b'

class SegmentService {
    async createSegment(segment) {
        const response = await axios.post(`${baseUrl}`, segment)
        return response
    }
}
const segmentService = new SegmentService()
export default segmentService