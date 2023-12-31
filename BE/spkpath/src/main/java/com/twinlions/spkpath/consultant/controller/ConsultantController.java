package com.twinlions.spkpath.consultant.controller;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.ConsultantSearchDto;
import com.twinlions.spkpath.consultant.service.ConsultantService;
import com.twinlions.spkpath.user.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cslt")
@Tag(name = "회원-상담사", description = "회원-상담사 관련 API 입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class ConsultantController {
    // private final Logger logger = LoggerFactory.getLogger(ConsultantController.class);

    private final ConsultantService consultantService;

    @GetMapping
    @Operation(summary = "상담사 전체 조회", description = "모든 상담사 회원 정보를 조회한다.")
    public ResponseEntity<List<ConsultantDto>> listCslt() {
        List<ConsultantDto> csltList = consultantService.getCslts();
        return new ResponseEntity<>(csltList, HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "상담사 상세 조회", description = "상세 조건에 맞는 회원 정보를 조회한다.")
    public ResponseEntity<List<ConsultantDto>> listCsltsByCond(@RequestBody ConsultantSearchDto consultantDto) {
        List<ConsultantDto> csltList = consultantService.getCsltsByCond(consultantDto);
        return new ResponseEntity<>(csltList, HttpStatus.OK);
    }

    @PostMapping("/showcslt")
    @Operation(summary = "상담사 아이디 조회", description = "상담사 아이디에 해당하는 상담사 정보를 반환한다.")
    public ResponseEntity<?> showConsultantById(@RequestBody UserVO userVO){
        try {
            ConsultantDto cslt = consultantService.getCsltByUserId(userVO.getUserId());
            if(cslt != null){
                return new ResponseEntity<>(cslt, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("empty", HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return new ResponseEntity<>("error", HttpStatus.BAD_GATEWAY);
        }
    }
}
