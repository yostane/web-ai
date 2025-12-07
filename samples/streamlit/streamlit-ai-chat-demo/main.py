import streamlit as st
from langchain_google_genai import ChatGoogleGenerativeAI

api_key = st.sidebar.text_input("Google AI API Key", type="password")
if len(api_key) == 0:
    st.error("No API key")
    st.stop()

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-lite", api_key=api_key)
system_message = (
    "system", "You are an expert at explaining programming languages' concepts.")

st.title("AI Coding coach")
with st.form("my_form"):
    text = st.text_area("Prompt:")
    submitted = st.form_submit_button("Submit")

if submitted:
    human_message = ("human", text)
    response = llm.invoke([system_message, human_message])
    st.info(response.content)
