
exports.getVideoClass = san => {
    class Video extends san.Component {
        initData() {
            return {
                src: '',
                objectFit: 'contain',
                controls: true
            };
        }
    }
    
    Video.template = `
        <div class="video-container">
            <video
                style="width: {{position.width}}px;height: {{position.height}}px;object-fit: {{objectFit}}"
                src="{{src}}"
                controls="{{controls}}"
            ></video>
        </div>
    `
    return Video;
}

