import axios from 'axios'

const API_URL = 'https://kzwyvxsgqdmygqixnkhd.supabase.co'
const API_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6d3l2eHNncWRteWdxaXhua2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjA0NTEsImV4cCI6MjAzMTc5NjQ1MX0.cWMq0kT2mlDFYtRVmYHibM8J8l787Pp0UyLx1HM2evE'

export async function fetchData() {
	try {
		const response = await axios.get(`${API_URL}/rest/v1/playlists`, {
			headers: {
				apikey: API_KEY,
			},
			params: {
				select: '*',
			},
		})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error 
	}
}

export default fetchData;
