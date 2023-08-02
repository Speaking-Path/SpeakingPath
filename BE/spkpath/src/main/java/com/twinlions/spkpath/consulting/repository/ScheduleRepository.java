package com.twinlions.spkpath.consulting.repository;

import com.twinlions.spkpath.consulting.entity.Schedule;
import com.twinlions.spkpath.consulting.key.SchedulePK;
import org.springframework.data.repository.Repository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends Repository<Schedule, SchedulePK> {

    List<Schedule> findAllBySchedulePKUserIdAndSchedulePKAvailableDate(String userId, LocalDate AvailableDate);
    Schedule save(Schedule schedule);
}
