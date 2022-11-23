// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    const request = async () => {

        const req = await fetch('https://covid19-api.weedmark.systems/api/v1/stats', {
            credentials: 'include'
        })

        const { data } = await req.json()

        return data.covid19Stats
    }


    try {
        const result = await request()

        res.status(200).json(result)

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e })
    }



}
