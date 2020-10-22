import http.client
import json
import numpy
from pymongo import MongoClient
import datetime
import pprint
from bson.objectid import ObjectId

client = MongoClient('mongodb://trading:secret@127.0.0.1:27017/')
trading_db = client['trading-db']
api_response_collection = trading_db['api-response-collection']

# post_id = trading_collection.insert_one(post).inserted_id
# print(post_id)
# pprint.pprint(trading_collection.find_one({'_id': ObjectId(post_id)}))
# print(trading_collection.drop())

# conn = http.client.HTTPSConnection("rapidapi.p.rapidapi.com")

# headers = {
#     'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
#     'x-rapidapi-key': "c1a14f833cmsh62627ab4f191309p1d4987jsne74b5fe0a94f"
#     }

# conn.request("GET", "/query?interval=60min&function=TIME_SERIES_INTRADAY&symbol=TSLA&datatype=json&output_size=compact", headers=headers)

# res = conn.getresponse()
# data = res.read()
# data_json = json.loads(data)

# response_id = api_response_collection.insert(data_json, check_keys=False)
pprint.pprint(api_response_collection.find_one())

# print(response_id)

# time_series = data_json['Time Series (60min)']
# # print(data_json['Time Series (60min)'])

# close_list = []

# for element in time_series:
#     print(time_series[element])
#     close_list.append(float(time_series[element]['4. close']))

# print(close_list)
# # close_np_array = numpy.array(close_list)

# # output = talib.SMA(close_np_array)