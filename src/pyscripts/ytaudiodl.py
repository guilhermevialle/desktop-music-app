from pydub import AudioSegment
import os
from pytube import YouTube
from tqdm import tqdm
import requests
import subprocess
import sys

title = None


def download_youtube_video(url):
    print('')
    yt = YouTube(url)
    streams = yt.streams.filter(mime_type='video/mp4').all()
    choice = 0
    stream = streams[choice]
    global title
    title = yt.title
    file_size = stream.filesize
    # Creating a progress bar
    pbar = tqdm(total=file_size, unit='B', unit_scale=True, desc=title)
    # Downloading the video
    response = requests.get(stream.url, stream=True)
    with open(f"{title}.mp4", "wb") as f:
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
                pbar.update(len(chunk))
    pbar.close()
    os.rename(f"{title}.mp4",
              f"{os.path.expanduser('~/Downloads')}/{title}.mp4")


if len(sys.argv) > 1:
    url = sys.argv[1]
    print('Fetching ' + url)
    print('')
    print('Esse processo pode levar alguns minutos. Aguarde...')
    download_youtube_video(url)


video_path = f"{os.path.expanduser('~/Downloads')}/{title}.mp4"


def convert_video_to_mp3(input_file):
    file_name = os.path.splitext(os.path.basename(input_file))[0]
    output_file = "/Users/guilhermevialle/Downloads/{}.mp3".format(file_name)
    command = ['ffmpeg', '-i', input_file,
               '-vn', '-c:a', 'libmp3lame', '-q:a', '0', output_file]
    subprocess.call(command)


if title and os.path.isfile(video_path):
    convert_video_to_mp3(video_path)
else:
    print('Arquivo de vídeo não encontrado')


def delete_file(file_path):
    print('')
    if os.path.isfile(file_path):
        os.remove(file_path)
        print(f"Arquivo {file_path} removido.")
    else:
        print(f"Arquivo {file_path} não existe.")


if os.path.isfile(video_path):
    delete_file(video_path)
else:
    print('Arquivo de vídeo não encontrado')
print('')
print('Segure Ctrl e clique aqui: ' + os.path.expanduser('~/Downloads'))

slowed_file_path = None


def slow_down(file_name, slow_factor):
    download_path = os.path.join(os.path.expanduser('~'), 'Downloads')
    file_path = os.path.join(download_path, file_name)
    song = AudioSegment.from_file(file_path)
    slowed_song = song._spawn(song.raw_data, overrides={
                              "frame_rate": int(song.frame_rate * slow_factor)})
    global slowed_file_path
    slowed_file_path = os.path.join(download_path, file_name)
    return slowed_song


if len(sys.argv) > 2:
    slow_factor = 0.823
    slowed_song = slow_down(title + '.mp3', slow_factor)
    slowed_song.export(slowed_file_path, format="mp3")
    print('Arquivo feito em slowed com sucesso!')
