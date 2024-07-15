import json

assistant_prompt = """
"""

basic_prompt = """
아래의 조건에 맞춰서 1주일의 저녁 식단을 작성해줘
- output 양식은 json으로 최대한 간결하고 깔끔하게, 양식에서 벗어나지 않도록
- weekly_menu json의 각 항목은 rice, soup_stew, main_dish, side_dish1, side_dish2, side_dish3, kimchi로 구성
- 요일은 Monday와 같은 형식으로 표기
- 메뉴명은 자세하게. 예를 들면 '고등어조림' 대신 '묵은지 고등어조림', '김치볶음밥' 대신 '스팸 김치볶음밥'
- 한식을 베이스로 양식이나 일식, 중식이 혼합된 한국식 가정식
- 급식이 맛있기로 유명한 한국의 중학교, 고등학교의 메뉴를 적극적으로 참고
- 김치 종류는 배추김치와 파김치, 깍두기까지 세 종류 
- 가까운 날짜에 동일한 김치가 너무 겹치지 않도록 고르게 배치
- 필수 영양소의 균형을 고려
- 면이나 볶음밥 같은 일품요리도 허용하되 파전, 부침개 등은 식사에서 제외
- 만약 일품요리가 식단에 포함되어 있다면 국이나 찌개는 해당 요리에 어울리도록 구성하거나 필요한 경우 빼도 무방
- 국이나 찌개 1개와 메인 요리 1개, 밑반찬 세 종류
- 4인 가족이 일반적으로 집에서 먹는 상황
- 만들기 너무 어렵지 않도록, 평범한 주부가 전체 조리시간 1시간 30분 내외
- 주말의 경우 평일보다 맛있는 특식으로 구성
- 밥의 종류는 흰쌀밥과 흑미밥, 잡곡밥, 현미밥을 섞어서 배치하되 흰쌀밥은 1주일 3회 미만
- 하루의 식단에 국 또는 찌개의 재료와 메인 요리의 재료가 중복되지 않도록
- 만약 국이나 찌개가 고기 베이스라면 나머지 요리에는 고기 종류가 들어가지 않도록
- 메인요리는 소, 돼지, 닭, 오리, 생선의 먹기 좋은 다양한 부위를 활용
- 나물, 무침류는 하루에 한 개만
- 일품요리가 탄수화물인 경우에 밥은 생략
- 일품요리의 경우 조리. 난이도가 높다면 반찬의 개수를 2가지로 줄여도 상관없음
- 무난하고 정석적인 한식이 아닌 퓨전 한식이나 트렌드에 맞춘 메뉴도 적극적으로 추가
- 동일한 밑반찬은 1주일 1회 중복 허용, 중복 간격이 4일을 넘으면 안됨
- 일품요리의 빈도는 1주일에 2회 이하
- 홍어, 고수, 코다리, 장어, 미꾸라지, 굴 등 개인에 따라 호불호가 갈리는 식재료는 최대한 배제
"""

# 정적 데이터 -> 추후 유저 입력에 따라 변경
personal_info_json = """
{
   "age": 30,
   "gender": "male",
   "height": 180,
   "weight": 70,
   "activity_level": "moderate",
   "dietary_preferences": {
       "vegetarian": false,
       "allergies": ["none"]
   },
   "health_conditions": ["none"],
   "goal": "gain weight",
   "special_requirements": "I like a chicken"
}
"""

personal_info = json.loads(personal_info_json)

def make_custom_question(personal_info: str, basic_prompt: str) -> str:
    
    dietary_preference = "vegetarian" if personal_info["dietary_preferences"]["vegetarian"] else "non-vegetarian"
    allergies = ', '.join(personal_info["dietary_preferences"]["allergies"])
    health_conditions = ', '.join(personal_info["health_conditions"])
    
    personal_prompt = f"""
    I am a {personal_info["age"]}-year-old {personal_info["gender"]} with a height of {personal_info["height"]} cm and a weight of {personal_info["weight"]} kg. 
    I have a {personal_info["activity_level"]} activity level and follow a {dietary_preference} diet. 
    I am allergic to {allergies} but have no specific health conditions ({health_conditions}). 
    My goal is to {personal_info["goal"]}. 
    In addition, {personal_info["special_requirements"]}.
    """

    result = "\n\n".join([personal_prompt, basic_prompt])
    return result

question = make_custom_question(personal_info, basic_prompt)