from multiprocessing.connection import answer_challenge
from flask import Flask, render_template, request
from flask import jsonify
from werkzeug.utils import secure_filename
import json
import os
import numpy as np
import time
import S000_Decompression
import S001_Preprocessing
import S002_Segmentation
import S003_Restore_Resolution
import S004_Register
import S005_Radiomics
import S006_Prediction_cBR

app = Flask(
    import_name=__name__,
    static_url_path="/python",  # 配置静态文件的访问url前缀
    static_folder="static",  # 配置静态文件的文件夹
    template_folder="templates",
)  # 配置模板文件的文件夹


@app.route("/")
def index():
    return render_template("main.html")


@app.route("/Upload", methods=["GET", "POST"])
def Upload():
    if request.method == "POST":
        # 接收数据
        # token = request.headers.get("Authorization")
        length = request.form.get("file_len")
        length = int(length)
        for i in range(0, length):
            key = "file" + str(i)
            file = request.files[key]
            file_name = "img.zip"
            save_dir = "file"
            if not os.path.exists(save_dir):
                os.mkdir(save_dir)
            save_path = os.path.join(save_dir, file_name)
            file.save(save_path)  # 保存文件到服务器上

        p1 = "Finish --------------------------------------------"
        print(p1)
        # 发送数据
        _log = {"log_list": p1}
        return _log

    else:
        return render_template("main.html")


@app.route("/Decompression", methods=["GET", "POST"])
def Decompression():
    if request.method == "GET":
        # time.sleep(5)
        S000_Decompression.run()
        p2 = "Finish --------------------------------------------"
        print(p2)
        # 发送数据
        _log = {"log_list": p2}
        return _log

    else:
        return render_template("main.html")


@app.route("/Preprocessing", methods=["GET", "POST"])
def Preprocessing():
    if request.method == "GET":
        # time.sleep(5)
        S001_Preprocessing.run()
        p3 = "Finish --------------------------------------------"
        print(p3)
        # 发送数据
        _log = {"log_list": p3}
        return _log

    else:
        return render_template("main.html")


@app.route("/Segmentation", methods=["GET", "POST"])
def Segmentation():
    if request.method == "GET":
        # time.sleep(5)
        S002_Segmentation.run()
        p4 = "Finish --------------------------------------------"
        print(p4)
        # 发送数据
        _log = {"log_list": p4}
        return _log

    else:
        return render_template("main.html")


@app.route("/Resolution", methods=["GET", "POST"])
def Resolution():
    if request.method == "GET":
        # time.sleep(5)
        S003_Restore_Resolution.run()
        p5 = "Finish --------------------------------------------"
        print(p5)
        # 发送数据
        _log = {"log_list": p5}
        return _log
    else:
        return render_template("main.html")


@app.route("/Register", methods=["GET", "POST"])
def Register():
    if request.method == "GET":
        S004_Register.run()
        # time.sleep(5)
        p6 = "Finish --------------------------------------------"
        print(p6)
        # 发送数据
        _log = {"log_list": p6}
        return _log

    else:
        return render_template("main.html")


@app.route("/Radiomics", methods=["GET", "POST"])
def Radiomics():
    if request.method == "GET":
        # time.sleep(5)
        S005_Radiomics.run()
        p7 = "Finish --------------------------------------------"
        print(p7)
        # 发送数据
        _log = {"log_list": p7}
        return _log

    else:
        return render_template("main.html")


# @app.route("/Prediciton", methods=["GET", "POST"])
# def Prediciton():
#     if request.method == "GET":
#         # time.sleep(5)
#         p8 = "Finish Prediciton"
#         print(p8)
#         # 发送数据
#         _log = {"log_list": p8}
#         return _log

#     else:
#         return render_template("main.html")


@app.route("/calculate", methods=["GET", "POST"])
def calculate():
    if request.method == "POST":
        # 接收数据
        age = request.form.get("AGE")
        gender = request.form.get("gender")
        Tstage = request.form.get("Tstage")
        Nstage = request.form.get("Nstage")
        TNM_stage = request.form.get("TNM_stage")
        
        # 根据表单信息转换成one-hot向量
        age_arr = np.array([abs((float(age) - 44.76804979) / 11.33869199)])
        gender_arr = np.array([0, 0])
        gender_arr[int(gender) - 1] += 1
        Tstage_arr = np.array([0, 0, 0, 0])
        Tstage_arr[int(Tstage) - 1] += 1
        Nstage_arr = np.array([0, 0, 0, 0, 0])
        Nstage_arr[int(Nstage)] += 1
        TNM_stage_arr = np.array([0, 0])
        TNM_stage_arr[int(TNM_stage) - 1] += 1

        # 拼接成14维的向量
        clinic_data = np.concatenate(
            (age_arr, gender_arr, Tstage_arr, Nstage_arr, TNM_stage_arr), axis=0
        )
        print(clinic_data)

        result = S006_Prediction_cBR.run(clinic_data)

        # time.sleep(5)
        p8 = "Predict -------------------------------------------"
        print(p8)
        # 发送数据

        answer = result
        _log = {"log_list": p8, "answer": answer}
        return _log

    else:
        return render_template("main.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
