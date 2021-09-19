const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const BaseApi = require('../index').default;

const api = new BaseApi('');

const mock = new MockAdapter(axios);

describe('BaseApi: get', () => {
  let todos;

  beforeEach(() => {
    todos = [
      { id: 1, title: 'Todo 1' }
    ];
    mock.onGet('/todos').reply(200, {
      todos
    });
  });

  test('should be defined', () => {
    expect(api.get).toBeDefined();
  });

  test('should return data from backend', () => {
    return api.get('/todos', {}).then(res => {
      expect(res.data.todos).toEqual(todos);
    });
  });
});

describe('BaseApi: post', () => {
  test('should be defined', () => {
    expect(api.post).toBeDefined();
  });
});

describe('BaseApi: put', () => {
  test('should be defined', () => {
    expect(api.put).toBeDefined();
  });
});

describe('BaseApi: patch', () => {
  test('should be defined', () => {
    expect(api.patch).toBeDefined();
  });
});

describe('BaseApi: delete', () => {
  test('should be defined', () => {
    expect(api.delete).toBeDefined();
  });
});
