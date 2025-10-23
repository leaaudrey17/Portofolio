import streamlit as st
import requests

# URL backend FastAPI
API_URL = "http://127.0.0.1:8000/predict"

# 🎨 Define pastel pink color palette with better contrast
PASTEL_PINK_PALETTE = [
    "#F6D1D1",  # Soft Pastel Pink (Header)
    "#F1A7C1",  # Blush Pink (Primary Buttons, Main Text)
    "#FFF5F5",  # Very Light Pink (Form Container Background)
    "#FFEBEB",  # Light Pink (Main App Background)
    "#FF6F91",  # Soft Rose Pink (Error/Success text, alerts)
    "#FFFFFF",  # Pure White (Individual Input Cards background)
    "#F4C9D1",  # Light Pink (Input fields background)
    "#333333"    # Dark Grey (Text for excellent readability)
]

# 🎨 Custom CSS for the pastel pink color palette with better contrast
st.markdown(f"""
    <style>
        .stApp {{
            background-color: {PASTEL_PINK_PALETTE[3]}; /* Light Pink for main app background */
            padding: 40px;
            font-family: 'Segoe UI', sans-serif;
            color: {PASTEL_PINK_PALETTE[7]}; /* Dark Grey for default text */
        }}

        h1 {{
            font-size: 3.5rem;
            color: {PASTEL_PINK_PALETTE[0]}; /* Soft Pastel Pink for header */
            text-align: center;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }}

        .stText {{
            font-size: 1.2rem;
            color: {PASTEL_PINK_PALETTE[7]}; /* Dark Grey */
            text-align: center;
            margin-bottom: 40px;
        }}

        /* Removed unnecessary container and ensured no extra boxes */
        .form-container {{
            background-color: {PASTEL_PINK_PALETTE[5]}; /* White background for form container */
            padding: 35px;
            border-radius: 20px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18); /* More prominent shadow for the whole form */
            margin-top: 30px;
            margin-bottom: 30px;
            border: 2px solid {PASTEL_PINK_PALETTE[1]}; /* Blush Pink border to create contrast */
        }}

        /* Styling for columns to create a card-like effect */
        .stColumns > div {{
            background-color: {PASTEL_PINK_PALETTE[5]}; /* Pure White background for individual input cards */
            padding: 15px;
            display: flex;
            justify-content: space-between;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            margin-bottom: 25px;
            border: 1px solid {PASTEL_PINK_PALETTE[0]}; /* Soft Pastel Pink border for inner cards */
        }}

        .stColumns .stTextInput,
        .stColumns .stNumberInput {{
            width: 100%;
            padding: 12px;
            font-size: 1.1rem;
            border-radius: 10px;
            border: 1px solid {PASTEL_PINK_PALETTE[0]}; /* Soft Pastel Pink border */
            margin-bottom: 15px;
        }}

        /* Button Styling */
        .stButton > button {{
            background-color: {PASTEL_PINK_PALETTE[1]}; /* Blush Pink */
            color: white;
            font-weight: bold;
            padding: 15px 35px;
            border-radius: 30px;
            font-size: 1.3rem;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.2s ease;
            width: 100%;
            border: none;
        }}

        .stButton > button:hover {{
            background-color: {PASTEL_PINK_PALETTE[0]}; /* Soft Pastel Pink hover effect */
            transform: translateY(-3px);
        }}

        /* Success/Error message styling */
        .stSuccess, .stError {{
            font-size: 1.8rem;
            color: {PASTEL_PINK_PALETTE[4]}; /* Soft Rose Pink for messages */
            font-weight: bold;
            text-align: center;
            background-color: {PASTEL_PINK_PALETTE[6]}; /* White background for messages */
            padding: 20px;
            border-radius: 15px;
            margin-top: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            border: 1px solid {PASTEL_PINK_PALETTE[4]}; /* Soft Rose Pink border */
        }}

        /* Labels for inputs */
        .st-emotion-cache-1weq7x0 p {{
            font-size: 1.1rem;
            font-weight: bold;
            color: {PASTEL_PINK_PALETTE[7]}; /* Dark Grey for labels */
            margin-bottom: 8px;
        }}

        /* Headings within the form */
        h2 {{
            color: {PASTEL_PINK_PALETTE[1]}; /* Blush Pink for form section headers */
            font-size: 1.8rem;
            margin-top: 0;
            margin-bottom: 25px;
            text-align: center;
        }}

        hr {{
            border-top: 1px solid {PASTEL_PINK_PALETTE[0]}; /* Soft Pastel Pink for HR line */
            margin-top: 40px;
            margin-bottom: 40px;
        }}
    </style>
""", unsafe_allow_html=True)

st.title("Prediksi Obesitas 🍔🥓🍰")
st.write("### Isi form di bawah untuk memprediksi kategori obesitas Anda! 🤔")

# Mapping display (Indonesia) → model value (English)
yn_map = {"Ya": "yes", "Tidak": "no"}
caec_map = {
    "Tidak Pernah": "no",
    "Kadang-kadang": "Sometimes",
    "Sering": "Frequently",
    "Selalu": "Always"
}
calc_map = caec_map
smoke_map = yn_map
scc_map = yn_map
favc_map = yn_map
fhwo_map = yn_map

mtrans_map = {
    "Transportasi Umum": "Public_Transportation",
    "Jalan Kaki": "Walking",
    "Mobil": "Automobile",
    "Motor": "Motorbike",
    "Sepeda": "Bike"
}

# Remove extra boxes and ensure no unwanted border
with st.container():
    with st.form("obesity_form"):
        st.markdown("<h2>Data Diri 🧑‍🤝‍👩</h2>", unsafe_allow_html=True)
        col1, col2, col3 = st.columns(3)
        with col1:
            Gender = st.selectbox("Jenis Kelamin 🚻", ["Laki-laki", "Perempuan"])
        with col2:
            Age = st.number_input("Umur (tahun) 🎂", min_value=5, max_value=100, step=1)
        with col3:
            Height = st.number_input("Tinggi badan (m) 📏", min_value=1.0, max_value=2.5, step=0.01)

        col4, col5 = st.columns(2)
        with col4:
            Weight = st.number_input("Berat badan (kg) ⚖️", min_value=10.0, max_value=200.0, step=0.5)
        with col5:
            family_history = st.selectbox("Ada riwayat obesitas di keluarga? 🧬", list(fhwo_map.keys()))

        st.markdown("---")
        st.markdown("<h2>Kebiasaan Makan & Minum 🍽️🥤</h2>", unsafe_allow_html=True)
        col6, col7 = st.columns(2)
        with col6:
            FAVC = st.selectbox("Sering konsumsi makanan tinggi kalori? 🍕", list(favc_map.keys()))
        with col7:
            FCVC = st.selectbox("Frekuensi makan sayur 🥦", ["Jarang", "Sedang", "Sering"])

        col8, col9 = st.columns(2)
        with col8:
            NCP = st.selectbox("Frekuensi makan harian ⏰", ["Kurang", "Cukup", "Berlebih"])
        with col9:
            CAEC = st.selectbox("Sering ngemil di luar waktu makan? 🍪", list(caec_map.keys()))

        col10, col11 = st.columns(2)
        with col10:
            SMOKE = st.selectbox("Merokok? 🚬", list(smoke_map.keys()))
        with col11:
            CH2O = st.selectbox("Konsumsi air putih 💧", ["Kurang", "Cukup", "Banyak"])

        st.markdown("---")
        st.markdown("<h2>Gaya Hidup & Kesehatan 🏃‍♀️🚶‍♂️</h2>", unsafe_allow_html=True)
        col12, col13 = st.columns(2)
        with col12:
            SCC = st.selectbox("Apakah anda memantau asupan kalori? 🤒", list(scc_map.keys()))
        with col13:
            FAF = st.selectbox("Aktivitas fisik mingguan 🏃‍♂️", ["Tidak Aktif", "Kurang Aktif", "Cukup Aktif", "Sangat Aktif"])

        col14, col15 = st.columns(2)
        with col14:
            TUE = st.selectbox("Durasi penggunaan teknologi setiap hari 💻", ["Tidak Pernah", "Jarang", "Sering"])
        with col15:
            CALC = st.selectbox("Konsumsi alkohol 🍷", list(calc_map.keys()))

        st.markdown("---")
        st.markdown("<h2>Transportasi 🚗💨</h2>", unsafe_allow_html=True)
        MTRANS = st.selectbox("Moda transportasi utama 🚌", list(mtrans_map.keys()))

        st.markdown("---")
        submitted = st.form_submit_button("Prediksi Obesitas Anda! ✨")

        if submitted:
            # 🔄 Konversi semua input ke format model
            input_data = {
                "Gender": "Male" if Gender == "Laki-laki" else "Female",
                "Age": Age,
                "Height": Height,
                "Weight": Weight,
                "family_history_with_overweight": fhwo_map[family_history],
                "FAVC": favc_map[FAVC],
                "FCVC": FCVC,
                "NCP": NCP,
                "CAEC": caec_map[CAEC],
                "SMOKE": smoke_map[SMOKE],
                "CH2O": CH2O,
                "SCC": scc_map[SCC],
                "FAF": FAF,
                "TUE": TUE,
                "CALC": calc_map[CALC],
                "MTRANS": mtrans_map[MTRANS]
            }

            try:
                response = requests.post(API_URL, json=input_data)
                if response.status_code == 200:
                    result = response.json()
                    st.success(f"🎉 Hasil Prediksi: *{result['prediction']}* 🎉")
                    st.balloons() # Add a fun animation!
                else:
                    st.error(f"Terjadi kesalahan saat mendapatkan hasil. Status code: {response.status_code} 😟")
            except Exception as e:
                st.error(f"Terjadi kesalahan: {e} 💔 Pastikan server FastAPI Anda berjalan.")
