import json

assistant_prompt = """
You are an Korean agent specialized in creating personalized meal plans for Korean home-cooked food. Your task is to analyze various physical information from the user and construct a delicious meal plan based on balanced nutrients. Using the provided information, create a weekly dinner menu.
"""

basic_prompt = """
 - 메뉴 이름은 반드시 한국어로, 각종 특수문자를 제거한 plain text로만, (선택), "또는" 처럼 부가 설명 없이 단순하게 메뉴 이름만 제시
 - The output format should be JSON, keeping it as concise and neat as possible.
 - Each item in the `weekly_menu` JSON should consist of `밥`, `국 또는 찌개`, `메인 요리`, `반찬 1`, `반찬 2`, `반찬 3`, and `김치`.
 - Days should be formatted as "월요일".
 - Detailed menu names.
 - The base should be Korean cuisine, but mixed with Korean-style home meals with Italian, French, Japanese, or Chinese influences.
 - Actively reference menus from middle and high schools in Korea known for their tasty meals.
 - Basic kimchi types include Napa cabbage kimchi and cubed radish kimchi.
 - Special types of kimchi include once in a week but every kimchi evenly distributed without repetition on consecutive days.
 - Consider essential nutrients for a balanced diet.
 - Single-dish meals such as noodles or fried rice are allowed but exclude pancakes or Korean-style fritters on main menu.
 - If a single-dish meal is included in the menu, soups or stews should complement it or can be omitted if unnecessary.
 - Assume the scenario is typical home dining for a family of four.
 - Meals shouldn't be too complicated; average housewives should finish cooking within 1 hour and 30 minutes.
 - Weekend meals should be special dishes tastier than weekday ones.
 - Alternate rice types including white rice, black rice, multigrain rice, and brown rice. White rice should be no more than three times a week.
 - Ensure no ingredient overlap between soup/stew and main dish each day.
 - If the soup or stew is meat-based, the remaining dishes shouldn't contain additional meat types.
 - Main dishes should utilize various parts of beef, pork, chicken, duck, and fish in manageable portions.
 - Only one vegetable or seasoned side dish per day.
 - If there's carbohydrate-rich food like noodles, pasta, or bread, omit rice. However, dishes like Japchae which contain glass noodles can include rice.
 - For single-dish meals with higher difficulty, reduce the number of side dishes to two if necessary.
 - Employ fusion Korean cuisine or trendy menus rather than straightforward traditional Korean food.
 - Same side dish can repeat only once in a week with at least a three-day interval.
 - Frequency of single-dish meals should be no more than twice a week.
 - Avoid ingredients that may have divided personal preferences such as skate, cilantro, pollack, eel, loach, and oysters.
"""

# 정적 데이터 -> 추후 유저 입력에 따라 변경
# personal_info_json = """
# {
#    "age": 30,
#    "gender": "male",
#    "height": 180,
#    "weight": 70,
#    "activity_level": "High",
#    "dietary_preferences": {
#        "vegetarian": false,
#        "allergies": ["none"]
#    },
#    "health_conditions": ["none"],
#    "goal": "gain weight",
#    "special_requirements": "none"
# }
# """

# personal_info = json.loads(personal_info_json)

# def make_custom_question(personal_info: str, basic_prompt: str) -> str:
    
#     dietary_preference = "vegetarian" if personal_info["dietary_preferences"]["vegetarian"] else "non-vegetarian"
#     allergies = ', '.join(personal_info["dietary_preferences"]["allergies"])
#     health_conditions = ', '.join(personal_info["health_conditions"])
    
#     personal_prompt = f"""
#     I am a {personal_info["age"]}-year-old {personal_info["gender"]} with a height of {personal_info["height"]} cm and a weight of {personal_info["weight"]} kg. 
#     I have a {personal_info["activity_level"]} activity level and follow a {dietary_preference} diet. 
#     I am allergic to {allergies} but have no specific health conditions ({health_conditions}). 
#     My goal is to {personal_info["goal"]}. 
#     In addition, {personal_info["special_requirements"]}.
#     """

#     result = "\n\n".join([personal_prompt, basic_prompt])
#     return result

# question = make_custom_question(personal_info, basic_prompt)
question = basic_prompt