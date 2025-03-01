namespace Genova.Temp.ResponseModifiers;

public class ResponseStreamWrapper : Stream
{
    private readonly Stream _originalStream;
    private readonly MemoryStream _memoryStream;

    public ResponseStreamWrapper(Stream originalStream)
    {
        _originalStream = originalStream;
        _memoryStream = new MemoryStream();
    }

    public override bool CanRead => _memoryStream.CanRead;
    public override bool CanSeek => _memoryStream.CanSeek;
    public override bool CanWrite => _memoryStream.CanWrite;
    public override long Length => _memoryStream.Length;
    public override long Position
    {
        get => _memoryStream.Position;
        set => _memoryStream.Position = value;
    }

    public override void Flush()
    {
        _memoryStream.Flush();
    }

    public override int Read(byte[] buffer, int offset, int count)
    {
        return _memoryStream.Read(buffer, offset, count);
    }

    public override long Seek(long offset, SeekOrigin origin)
    {
        return _memoryStream.Seek(offset, origin);
    }

    public override void SetLength(long value)
    {
        _memoryStream.SetLength(value);
    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        _memoryStream.Write(buffer, offset, count);
    }

    public async Task WriteToOriginalStreamAsync()
    {
        _memoryStream.Position = 0;
        await _memoryStream.CopyToAsync(_originalStream);
    }

    public string GetContent()
    {
        _memoryStream.Position = 0;
        using (var reader = new StreamReader(_memoryStream, leaveOpen: true))
        {
            return reader.ReadToEnd();
        }
    }

    public byte[] GetBinaryContent()
    {
        _memoryStream.Position = 0;
        return _memoryStream.ToArray();
    }
}