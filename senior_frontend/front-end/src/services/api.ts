import { Indicator, Dimension } from '../types';

export class ApiService {
  async fetchIndicators(dimensionId: number, dateRange: string[]): Promise<Indicator[]> {
    const indicators = ['co2_emissions', 'total_revenue', 'female_headcount', 'male_headcount'];
    const indicatorsParams = indicators.map(indicator => `indicators=${indicator}`).join('&');
    const url = `http://localhost:8080/indicators?start=${dateRange[0]}&end=${dateRange[1]}&dimensions=${dimensionId}&${indicatorsParams}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Restructure data
      const results: Indicator[] = data.results.reduce((acc: any, curr: any) => {
        const existing = acc.find((result: any) => result.date === curr.date);
        if (existing) {
          existing[curr.indicator] = curr.value;
        } else {
          acc.push({ date: curr.date, [curr.indicator]: curr.value });
        }
        return acc;
      }, []);
  
      // Compute gender parity ratio
      results.forEach((result: any) => {
        if (result.male_headcount + result.female_headcount > 0) {
          result.gender_parity_ratio = result.female_headcount / result.male_headcount;
        } else {
          result.gender_parity_ratio = 0;
        }
      });
  
      return results;
    } catch (e) {
      console.log('error', e);
      return [];
    }
  }
  
  async fetchDimensions(): Promise<Dimension[]> {
    const url = 'http://localhost:8080/dimensions';
    try {
      const response = await fetch(url, {method: 'GET'});
      const data = await response.json();

      // Restructure data
      const results: Dimension[] = data.results.map((item: any) => {
        return {
          id: item.id,
          country: item.country,
          business_unit: item.business_unit
        };
      });

      return results;
    } catch (e) {
      console.log('error', e);
      return [];
    }
  }

  async fetchDimension(): Promise<Dimension[]> {
    const url = 'http://localhost:8080/dimensions/${id}';
    try {
      const response = await fetch(url, {method: 'GET'});
      const data = await response.json();
      return data.results;
    } catch (e) {
      return Promise.resolve([]);
    }
  }
}


//indicators?start=2023-12-01&end=2023-12-01&dimensions=2&indicators=co2_emissions&indicators=total_revenue&indicators=female_headcount&indicators=male_headcount