// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { filter } = req.query;

  const request = async () => {
    const req = await fetch(
      "https://covid19-api.weedmark.systems/api/v1/stats",
      {
        credentials: "include",
      }
    );

    const { data } = await req.json();

    return data.covid19Stats;
  };

  const returnDataByQuery = async (data, query) => {
    switch (query) {
      case "cases":
        return await data.reduce((a, e) => a + e.confirmed, 0);
      case "cases-ukraine":
        return await data.reduce((a, e) => {
          if (e.country !== "Ukraine") {
            return a;
          }
          return a + e.confirmed;
        }, 0);
      case "deaths":
        return await data.reduce((a, e) => a + e.deaths, 0);

      case "deaths-ukraine":
        return await data.reduce((a, e) => {
          if (e.country !== "Ukraine") {
            return a;
          }
          return a + e.deaths;
        }, 0);
      default:
        return await data;
    }
  };

  try {
    const result = await request();

    const data = await returnDataByQuery(result, filter);

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
