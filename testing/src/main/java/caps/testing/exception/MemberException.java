package caps.testing.exception;

import caps.testing.exception.BaseException;
import caps.testing.exception.BaseExceptionType;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
public class MemberException extends BaseException{

    private BaseExceptionType exceptionType;

    @Override
    public BaseExceptionType getExceptionType(){
        return exceptionType;
    }
}
