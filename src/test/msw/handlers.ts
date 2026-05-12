import { http, HttpResponse } from 'msw'

export const mockProducts = [
  {
    id: '1',
    name: 'Orquídea',
    binomialName: 'Ophrys tenthredinifera',
    price: 4.95,
    imgUrl: 'https://example.com/orquidea.jpg',
    wateringsPerWeek: 1,
    fertilizerType: 'Nitrato',
  },
  {
    id: '2',
    name: 'Rosa de damasco',
    binomialName: 'Rosa damascena',
    price: 10.5,
    imgUrl: 'https://example.com/rosa.jpg',
    wateringsPerWeek: 2,
    fertilizerType: 'Fosfato',
  },
  {
    id: '3',
    name: 'Petunia',
    binomialName: 'Petunia axillaris',
    price: 5.45,
    imgUrl: 'https://example.com/petunia.jpg',
  },
  {
    id: '4',
    name: 'Helecho',
    binomialName: 'Pteridium Aquilinum',
    price: 12.55,
    imgUrl: 'https://example.com/helecho.jpg',
    wateringsPerWeek: 3,
  },
  {
    id: '5',
    name: 'Rosa silvestre',
    binomialName: 'Rosa canina',
    price: 20.45,
    imgUrl: 'https://example.com/rosa-silvestre.jpg',
  },
  {
    id: '6',
    name: 'Girasol',
    binomialName: 'Helianthus annuus',
    price: 5.25,
    imgUrl: 'https://example.com/girasol.jpg',
    wateringsPerWeek: 2,
    fertilizerType: 'Potasio',
  },
]

export const handlers = [
  http.get('https://dulces-petalos.jakala.es/api/v1/product', () => {
    return HttpResponse.json(mockProducts)
  }),

  http.get(
    'https://dulces-petalos.jakala.es/api/v1/product/:id',
    ({ params }) => {
      const product = mockProducts.find((p) => p.id === params.id)
      if (!product) {
        return new HttpResponse(null, { status: 404 })
      }
      return HttpResponse.json(product)
    }
  ),
]
