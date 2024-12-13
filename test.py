import requests
from urllib.parse import quote


def fetch_enuri_products(keyword):
    url = "https://www.enuri.com/wide/api/listGoods.jsp"
    encoded_keyword = quote(keyword)

    headers = {
        'authority': 'www.enuri.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.enuri.com',
        'referer': f'https://www.enuri.com/search.jsp?keyword={encoded_keyword}',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    }

    cookies = {
        'LENA-UID': '11703c7b.628e6f3ea3b5b',
        'SCOUTER': 'x9q2s5q9seo9c',
    }

    data = {
        'from': 'search',
        'device': 'pc',
        'category': '',
        'tab': '0',
        'isDelivery': 'N',
        'isRental': 'N',
        'pageNum': '1',
        'pageGap': '40',
        'sort': '1',
        'factory': '',
        'factory_code': '',
        'brand': '',
        'brand_code': '',
        'bf': '',
        'shopcode': '',
        'keyword': encoded_keyword,
        'in_keyword': '',
        's_price': '0',
        'e_price': '0',
        'spec': '',
        'spec_name': '',
        'color': '',
        'isReSearch': 'Y',
        'isTest': 'N',
        'prtmodelno': '',
        'isMakeshop': 'Y',
        'discount': '',
        'bbsscore': '',
        'unit': '',
        'decrease': '',
        'benefits': '',
        'card': '',
        'isMatchPl': '',
        'c_sort': '',
    }

    try:
        response = requests.post(
            url,
            headers=headers,
            cookies=cookies,
            data=data,
            verify=False
        )
        response.raise_for_status()
        response.encoding = 'utf-8'

        json_response = response.json()

        if 'data' in json_response and 'list' in json_response['data']:
            print(json_response['data']['list'][0]['strModelNo'])
            print(json_response['data']['list'][0]['strDecreaseRate'])

        return json_response

    except Exception as e:
        print("Error:", str(e))
        print("Full Response:", response.text[:200] if 'response' in locals()
              else "No response")
        return None


def fetch_enuri_product_detail(modelno):
    url = "https://www.enuri.com/wide/api/product/prodShopPrice.jsp"

    headers = {
        'authority': 'www.enuri.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.enuri.com',
        'referer': f'https://www.enuri.com/detail.jsp?modelno={modelno}',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    }

    cookies = {
        'LENA-UID': '11703c7b.628e6f3ea3b5b',
        'SCOUTER': 'x9q2s5q9seo9c',
    }

    # 실제 form data
    data = {
        'modelno': modelno,
        'delivery': 'Y',
        'card': 'N',
        'prono': '',
        'callcnt': '0'
    }

    try:
        response = requests.post(
            url,
            headers=headers,
            cookies=cookies,
            data=data,
            verify=False
        )
        response.raise_for_status()
        response.encoding = 'utf-8'

        print("\n--- Product Detail Response ---")
        print(response.json()['data']['shopPricelist'])
        print(response.json()['total'])
        # print(response)
        # print(response.total)
        print("--------------------------------\n")

        return response.json()
    except Exception as e:
        print("Error:", str(e))
        print("Full Response:", response.text[:2] if 'response' in locals()
              else "No response")
        return None


if __name__ == "__main__":
    # 상품 상세 정보 테스트
    # fetch_enuri_products("아이폰")
    detail = fetch_enuri_product_detail("127845292")
    if detail:
        print("\nDetail Results:", detail)
